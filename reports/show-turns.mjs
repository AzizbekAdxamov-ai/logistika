// Broker va Grace jonli javoblarini o'qiladigan ko'rinishda chiqaradi.
// Faqat o'qiydi (SELECT) -- bazaga hech narsa yozmaydi.
//
// backend papkasidan ishga tushiring:
//   node ..\reports\show-turns.mjs                  oxirgi 20 javob
//   node ..\reports\show-turns.mjs --chat driver    faqat Grace
//   node ..\reports\show-turns.mjs --chat broker    faqat broker
//   node ..\reports\show-turns.mjs --last 50        oxirgi 50 ta
//   node ..\reports\show-turns.mjs --watch          yangi javoblarni kutib turadi (Ctrl+C -- chiqish)
//
// Manba: chat_turn_log jadvali (migratsiya 056) -- sayt har bir javobni shu yerga yozadi.

import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const backend = join(dirname(fileURLToPath(import.meta.url)), '..', 'backend')
const require = createRequire(join(backend, 'package.json'))
require('dotenv').config({ path: join(backend, '.env'), quiet: true })
const { Pool } = require('pg')

const args = process.argv.slice(2)
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined }
const chat = opt('--chat')
const last = Math.max(1, Math.min(500, Number(opt('--last') ?? 20) || 20))
const watch = args.includes('--watch')
if (chat && !['broker', 'driver'].includes(chat)) {
  console.error('--chat faqat broker yoki driver bo\'lishi mumkin')
  process.exit(1)
}

const url = process.env.DATABASE_URL
if (!url) { console.error('DATABASE_URL topilmadi (backend/.env)'); process.exit(1) }
const host = (() => { try { return new URL(url).hostname } catch { return '' } })()
const pool = new Pool({ connectionString: url, ssl: /^(localhost|127\.0\.0\.1)$/.test(host) ? false : { rejectUnauthorized: true } })

const time = (d) => new Date(d).toLocaleString('en-GB', { hour12: false })
const wrap = (label, text) => `${label}${String(text ?? '').replace(/\n/g, '\n' + ' '.repeat(label.length))}`

function print(r) {
  const attempts = Array.isArray(r.attempts) ? r.attempts : []
  const ms = attempts.reduce((s, a) => s + (Number(a?.ms) || 0), 0)
  const servedBy = [...new Set(attempts.map((a) => a?.servedBy).filter(Boolean))].join('/')
  const head = [
    `#${r.id}`, time(r.created_at), String(r.chat).toUpperCase(), r.model + (servedBy ? ` (${servedBy})` : ''),
    `${r.provider_requests ?? attempts.length} so'rov`, ms ? `${(ms / 1000).toFixed(1)} s` : null,
  ].filter(Boolean).join(' · ')
  console.log('\n' + '─'.repeat(70))
  console.log(head)
  console.log(wrap('Dispatcher: ', r.dispatcher_text))
  console.log(r.reply != null ? wrap(r.chat === 'driver' ? 'Grace:      ' : 'Broker:     ', r.reply) : 'Javob yo\'q')
  const notes = []
  if (r.regenerated_because) notes.push(`qayta yozildi: ${r.regenerated_because}`)
  if (r.fell_back) notes.push('kod yozgan zaxira qator ko\'rsatildi')
  if (r.error) notes.push(`xato: ${r.error}`)
  const findings = Array.isArray(r.findings) ? r.findings : []
  if (findings.length) notes.push(`tekshiruv: ${findings.map((f) => (typeof f === 'string' ? f : JSON.stringify(f))).join('; ')}`)
  const models = [...new Set(attempts.map((a) => a?.model).filter(Boolean))]
  if (models.length > 1) notes.push(`modellar: ${models.join(' → ')}`)
  for (const n of notes) console.log('  ⚠ ' + n)
}

const where = chat ? 'WHERE t.chat = $1' : ''
const params = chat ? [chat] : []

async function latest() {
  const { rows } = await pool.query(
    `SELECT to_jsonb(t) AS r FROM chat_turn_log t ${where} ORDER BY t.id DESC LIMIT ${last}`, params)
  return rows.map((x) => x.r).reverse()
}

async function after(id) {
  const cond = chat ? 'WHERE t.chat = $1 AND t.id > $2' : 'WHERE t.id > $1'
  const { rows } = await pool.query(
    `SELECT to_jsonb(t) AS r FROM chat_turn_log t ${cond} ORDER BY t.id`, chat ? [chat, id] : [id])
  return rows.map((x) => x.r)
}

try {
  const rows = await latest()
  if (!rows.length) console.log('Hali javob yozilmagan.')
  rows.forEach(print)
  if (!watch) { await pool.end(); process.exit(0) }
  let lastId = rows.length ? rows[rows.length - 1].id : 0
  console.log('\n... yangi javoblar kutilmoqda (Ctrl+C -- chiqish)')
  setInterval(async () => {
    try {
      for (const r of await after(lastId)) { print(r); lastId = r.id }
    } catch (e) { console.error('o\'qishda xato:', e.message) }
  }, 3000)
} catch (e) {
  console.error('Bazaga ulanib bo\'lmadi yoki so\'rovda xato:', e.message)
  await pool.end().catch(() => {})
  process.exit(1)
}
