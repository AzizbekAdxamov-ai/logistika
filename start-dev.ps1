# Starts the DispatchSim API (and web app) in their own visible windows,
# so they keep running if the terminal that launched them is closed.
#   -ApiOnly    only the backend (a running web app is left alone)
#   -NoBrowser  do not open the browser
param(
    [switch]$ApiOnly,
    [switch]$NoBrowser
)

$root = $PSScriptRoot
$backendDir = Join-Path $root 'backend'
$frontendDir = Join-Path $root 'frontend'
$pidFile = Join-Path $root '.dev-pids'

function Wait-Url([string]$Url, [int]$Seconds) {
    for ($i = 0; $i -lt $Seconds; $i++) {
        try {
            $r = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
            if ($r.StatusCode -eq 200) { return $true }
        } catch { }
        Start-Sleep -Seconds 1
    }
    return $false
}

function Start-Window([string]$Role, [string]$Title, [string]$Dir) {
    # npm.cmd, not npm: npm.ps1 can be blocked by the ExecutionPolicy
    $inner = "`$host.UI.RawUI.WindowTitle = '$Title'; npm.cmd run dev"
    $p = Start-Process -FilePath 'powershell.exe' `
        -ArgumentList '-NoProfile', '-ExecutionPolicy', 'Bypass', '-NoExit', '-Command', $inner `
        -WorkingDirectory $Dir -PassThru
    Add-Content -Path $pidFile -Value "${Role}:$($p.Id)"
    Write-Host "Started '$Title' window (PID $($p.Id))"
}

Write-Host 'Stopping old dev processes...'
if ($ApiOnly) { & (Join-Path $root 'stop-dev.ps1') -ApiOnly } else { & (Join-Path $root 'stop-dev.ps1') }
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Could not free the ports - see messages above.' -ForegroundColor Red
    exit 1
}

Start-Window 'API' 'DispatchSim API' $backendDir

Write-Host 'Waiting for http://localhost:4000/health ...'
if (-not (Wait-Url 'http://localhost:4000/health' 60)) {
    Write-Host "API did not start - check the 'DispatchSim API' window" -ForegroundColor Red
    exit 1
}
Write-Host 'API is up: http://localhost:4000' -ForegroundColor Green

if ($ApiOnly) { exit 0 }

Start-Window 'WEB' 'DispatchSim Web' $frontendDir

Write-Host 'Waiting for http://localhost:5173 ...'
if (-not (Wait-Url 'http://localhost:5173' 60)) {
    Write-Host "Web app did not start - check the 'DispatchSim Web' window" -ForegroundColor Red
    exit 1
}
Write-Host 'Web is up: http://localhost:5173' -ForegroundColor Green
if (-not $NoBrowser) { Start-Process 'http://localhost:5173' }
exit 0
