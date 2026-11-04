# Stops the DispatchSim dev servers (API :4000, web :5173), their windows and
# stale node processes of this project. Other processes are never killed:
# if a foreign program owns one of our ports, it is reported and exit code is 1.
#   -ApiOnly   only the API (:4000); the web app is left running
#   -WhatIf    dry run: print what would be stopped, stop nothing
param(
    [switch]$ApiOnly,
    [switch]$WhatIf
)

$root = $PSScriptRoot
$pidFile = Join-Path $root '.dev-pids'
$ports = if ($ApiOnly) { @(4000) } else { @(4000, 5173) }
$roles = if ($ApiOnly) { @('API') } else { @('API', 'WEB') }

function Test-Under([string]$Text) {
    return ($Text -and $Text.IndexOf($root, [System.StringComparison]::OrdinalIgnoreCase) -ge 0)
}

# Command-line shapes of our dev servers. Anchored so e.g. "invite" never matches.
$apiPattern = '(^|[\s"\/])src[\/]server\.js(\s|"|$)'
$webPattern = '[\/]node_modules[\/]vite[\/]|(^|[\s"\/])vite(\.cmd|\.js)?(\s|"|$)'

# Ancestor chain stops at these (neither they nor anything above them is judged).
$stopNames = 'code.exe', 'explorer.exe', 'WindowsTerminal.exe', 'OpenConsole.exe'
$shellNames = 'cmd.exe', 'powershell.exe', 'pwsh.exe', 'node.exe'
$windowPids = @()
if (Test-Path $pidFile) {
    $windowPids = @(Get-Content $pidFile | ForEach-Object { if ($_ -match ':(\d+)$') { [int]$Matches[1] } })
}

# Is this process provably ours? Yes if its OWN command line holds the project
# root, or an ancestor is one of our windows (listed in .dev-pids, or titled
# "DispatchSim API/Web") or a cmd/powershell/pwsh/node whose command line holds
# the root. Walking up stops at editors/terminals/claude so a foreign project
# opened from VS Code is never claimed through the editor's command line.
function Test-Ours($Proc) {
    if (Test-Under ([string]$Proc.CommandLine)) { return $true }
    $cur = Get-CimInstance Win32_Process -Filter "ProcessId = $($Proc.ParentProcessId)" -ErrorAction SilentlyContinue
    for ($i = 0; $i -lt 8 -and $cur; $i++) {
        if ($stopNames -contains $cur.Name -or $cur.Name -like 'claude*.exe') { return $false }
        $c = [string]$cur.CommandLine
        if ($windowPids -contains [int]$cur.ProcessId) { return $true }
        if ($c -match 'DispatchSim (API|Web)') { return $true }
        if (($shellNames -contains $cur.Name) -and (Test-Under $c)) { return $true }
        $cur = Get-CimInstance Win32_Process -Filter "ProcessId = $($cur.ParentProcessId)" -ErrorAction SilentlyContinue
    }
    return $false
}
# Listener PIDs for a port. Get-NetTCPConnection returns nothing on this
# machine, so netstat is used. Language-independent (no state words). On this
# machine netstat shows the listener row with PID 0 / not at all, but accepted
# connections carry the server's real PID, so any row whose LOCAL address ends in
# :<port> (clients use ephemeral local ports) with a real PID identifies the owner.
function Get-PortOwners([int]$Port) {
    $owners = @()
    foreach ($line in (netstat -ano)) {
        $t = ($line -split '\s+') | Where-Object { $_ }
        if ($t.Count -lt 4 -or $t[0] -ne 'TCP') { continue }
        if ($t[1] -notmatch ":$Port$") { continue }
        $owners += [int]$t[-1]
    }
    return $owners | Select-Object -Unique
}

function Stop-Tree([int]$ProcId, [string]$Why) {
    if ($WhatIf) { Write-Host "Would stop PID $ProcId ($Why)"; return $true }
    $null = & taskkill.exe /PID $ProcId /T /F 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Stopped PID $ProcId ($Why)"
        return $true
    }
    if (Get-Process -Id $ProcId -ErrorAction SilentlyContinue) {
        Write-Host "WARNING: could not stop PID $ProcId ($Why)" -ForegroundColor Yellow
        return $false
    }
    return $true   # already gone
}

$ok = $true
$targets = @{}   # PID -> reason

# 1. Port owners: ours only if node.exe running this project.
foreach ($port in $ports) {
    foreach ($ownerPid in (Get-PortOwners $port)) {
        if ($ownerPid -le 4) { continue }
        $proc = Get-CimInstance Win32_Process -Filter "ProcessId = $ownerPid" -ErrorAction SilentlyContinue
        if (-not $proc) { continue }
        $cmd = [string]$proc.CommandLine
        if ($proc.Name -ieq 'node.exe' -and (Test-Ours $proc)) {
            $targets[$ownerPid] = "listening on :$port"
        } elseif ($proc.Name -ieq 'node.exe' -and ($cmd -match $apiPattern -or $cmd -match $webPattern)) {
            Write-Host "Port $port is held by node PID $ownerPid ($($cmd.Trim())) - could not confirm it is this project; stop it yourself" -ForegroundColor Red
            $ok = $false
        } else {
            Write-Host "Port $port is busy by $($proc.Name) (PID $ownerPid) - not ours, stop it yourself" -ForegroundColor Red
            $ok = $false
        }
    }
}
# 2. Stale node dev processes of this project that are not on a port.
$nodes = Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" -ErrorAction SilentlyContinue
foreach ($p in $nodes) {
    $cmd = [string]$p.CommandLine
    if (-not $cmd) { continue }
    $isApi = $cmd -match $apiPattern
    $isWeb = $cmd -match $webPattern
    if (-not ($isApi -or ($isWeb -and -not $ApiOnly))) { continue }
    if (Test-Ours $p) {
        if (-not $targets.ContainsKey([int]$p.ProcessId)) { $targets[[int]$p.ProcessId] = 'project dev process' }
    } else {
        Write-Host "Left alone: node PID $($p.ProcessId) ($($cmd.Trim())) - could not confirm it is this project"
    }
}
foreach ($procId in @($targets.Keys)) {
    if (-not (Stop-Tree $procId $targets[$procId])) { $ok = $false }
}

if ($WhatIf) { foreach ($w in $windowPids) { Write-Host "Would close window PID $w (if still ours)" }; exit 0 }

# 3. Close the console windows we opened (recorded in .dev-pids as ROLE:PID).
if (Test-Path $pidFile) {
    $keep = @()
    foreach ($line in (Get-Content $pidFile)) {
        if ($line -notmatch '^(API|WEB):(\d+)$') { continue }
        $role = $Matches[1]; $winPid = [int]$Matches[2]
        if ($roles -notcontains $role) { $keep += $line; continue }
        $w = Get-Process -Id $winPid -ErrorAction SilentlyContinue
        if ($w -and $w.ProcessName -ieq 'powershell') {   # guard against PID reuse
            if (-not (Stop-Tree $winPid "$role window")) { $ok = $false }
        }
    }
    if ($keep.Count -gt 0) { Set-Content -Path $pidFile -Value $keep } else { Remove-Item $pidFile -Force -ErrorAction SilentlyContinue }
}

# Windows opened by an older run (not in .dev-pids): match by window title.
$titles = @{ API = 'DispatchSim API'; WEB = 'DispatchSim Web' }
foreach ($role in $roles) {
    Get-Process -Name powershell -ErrorAction SilentlyContinue |
        Where-Object { $_.MainWindowTitle -eq $titles[$role] -and $_.Id -ne $PID } |
        ForEach-Object { if (-not (Stop-Tree $_.Id "$role window")) { $ok = $false } }
}

# 4. Wait until our ports are really free (max ~10 s). A connect probe is used
# too, because an idle server may not show up in netstat at all here.
function Test-PortOpen([int]$Port) {
    $c = New-Object System.Net.Sockets.TcpClient
    try {
        $iar = $c.BeginConnect('localhost', $Port, $null, $null)
        return ($iar.AsyncWaitHandle.WaitOne(500) -and $c.Connected)
    } catch { return $false } finally { $c.Close() }
}
foreach ($port in $ports) {
    for ($i = 0; $i -lt 10 -and (Test-PortOpen $port); $i++) { Start-Sleep -Seconds 1 }
    if (Test-PortOpen $port) {
        $left = @(Get-PortOwners $port | Where-Object { $_ -gt 4 })
        $who = if ($left) { " (PID $($left -join ', '))" } else { '' }
        Write-Host "Port $port is still busy$who - stop it yourself" -ForegroundColor Red
        $ok = $false
    }
}
if ($targets.Count -eq 0 -and $ok) { Write-Host 'Nothing to stop.' }
if ($ok) { exit 0 } else { exit 1 }
