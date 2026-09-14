# Load Board Frontend — Hisobot

**Sana:** 2026-08-30
**Holat:** ✅ Tugallandi — lint 0 xato, build muvaffaqiyatli

---

## Yaratilgan fayllar (6 yangi)

| Fayl | Vazifa |
|---|---|
| `src/api/loadBoard.js` | API qatlami: `listPostings`, `getPosting`, `bookPosting`. `api/loads.js` naqshi |
| `src/pages/LoadBoard.jsx` | Asosiy sahifa: jadval, filtrlar, drawer, bron oqimi |
| `src/pages/LoadBoard.css` | Sahifa stillari — faqat `lb-` prefiksli klasslar |
| `src/components/loadboard/PostingFilters.jsx` | Filtrlar: jihoz turi, kelish shtati, saralash, qidiruv |
| `src/components/loadboard/PostingFilters.css` | Filtrlar stillari |
| `src/components/loadboard/PostingDetail.jsx` | Drawer: eʼlon tafsilotlari, ogohlantirishlar, Book tugmasi |
| `src/components/loadboard/PostingDetail.css` | Drawer stillari |

## Oʻzgartirilgan fayllar (4 ta)

| Fayl | Oʻzgarish |
|---|---|
| `src/utils/format.js` | `formatRatePerMile(rateUsd, distanceMi)` va `formatDeadhead(mi)` qoʻshildi |
| `src/App.jsx` | `<Route path="load-board">` qoʻshildi |
| `src/components/layout/Sidebar.jsx` | `MagnifyingGlass` import, nav item qoʻshildi |
| `src/components/layout/AppShell.jsx` | `TITLES['/load-board']` qoʻshildi |

---

## Bron oqimi (backend shartnomasiga mos)

1. **Qator bosilganda** → `PostingDetail` drawer (Framer Motion slide)
2. **Oldindan ogohlantirish** — qoʻshimcha soʻrovsiz:
   - `deadheadMi > 250` → "Long deadhead — driver may not reach pickup in time."
   - `nearestDriver == null` → "No available driver near this origin."
   - **Hech qachon tugmani oʻchirmaydi** (warn-but-allow)
3. **Book bosilganda** → tugma busy (`busyId` naqshi), server idempotentligi bilan ikki qatlamli himoya
4. **201/200** → yangi load id (mono) + `/loads/{id}` havola + ogohlantirishlar frontend matnlari bilan
5. **POSTING_TAKEN / POSTING_EXPIRED** → eslatma + darhol `refetch()`
6. **Xato** → `err.code` xaritasi orqali xabar

---

## Backend shartnomasiga moslik

| Talab | Holat |
|---|---|
| POST body: `{ driverId?: string }` | ✅ `bookPosting(id, { driverId })` |
| 201/200 bir xil shakl | ✅ Bitta kod yoʻli ikkalasini ham ushlaydi |
| Ogohlantirish kalitlari | ✅ `WARNING_TEXT` xaritasi: `no-matching-equipment`, `no-available-driver`, `tight-pickup-window` |
| ratePerMile frontendda hisob | ✅ `formatRatePerMile(rateUsd, distanceMi)` |
| Deadhead uchinchi ustun | ✅ Age · Route · **Deadhead** · Equipment · Rate · $/mi · Pickup · Broker · Expires · Book |
| `lb-` prefiksli klasslar | ✅ Hamma yangi klasslar `lb-` bilan boshlanadi |
| `components/dashboard/LoadBoard.css` import yoʻq | ✅ Import qilinmagan |

---

## Qoidalar bajarilishi

| Qoida | Holat |
|---|---|
| Hardcoded rang 0 | ✅ Faqat `var(--...)` ishlatilgan |
| Hardcoded matn 0 | ✅ Hamma matn EN, props yoki sahifa darajasida |
| Taqiqlangan soʻz 0 | ✅ "board" — haqiqiy soha atamasi |
| equipmentType faqat kalit | ✅ `data/equipmentTypes.js` dan |
| Raqam/sana `utils/format.js` orqali | ✅ |
| mono klass (raqam/ID) | ✅ IBM Plex Mono |

---

## Tekshirilmagan narsalar

1. **Backend bilan real sinov** — backend ishlayotgan boʻlishi kerak, lekin hozir faqat frontend qurildi
2. **Light/cream tema deadhead ranglari** — CSS oʻzgaruvchilari (`--green`, `--amber`, `--red`) ishlatilgan, lekin light tema handlerlarini qoʻlda tekshirish kerak
3. **Mobile responsive** — drawer 420px, mobile qurilmalarda `max-width: 90vw` bilan ishlaydi, lekin toʻliq responsive test qilinmagan
4. **Pagination** — hozir `limit: 50` bilan cheklangan, backend pagination qoʻllab-quvvatlasa, keyinroq qoʻshish mumkin
5. **`originState` filtri** — backend qoʻllab-quvvatlasa ishlaydi, lekin backend filtr qanday ishlashini bilmasdan tekshirib boʻlmaydi
6. **Dark tema `.lb-dh-*` ranglari** — fallback qiymatlar bilan (`#28a745`, `#d99f33`, `#dc3545`), lekin CSS oʻzgaruvchilari mavjud boʻlsa ular ishlatiladi
