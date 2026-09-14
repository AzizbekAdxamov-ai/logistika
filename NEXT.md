# Qayerda to'xtadik — 2026-09-13

Ertaga ishni shu fayldan boshlang. Uchta bo'lim: bugun nima qilindi, ertaga nima
qilinadi, va hal qilinmagan savollar.

---

## 1. Bugun nima qilindi

### Chat OpenRouter'ga, seed Groq'ga

Ikki provayder ikki ishga bo'lindi. Groq lug'at yozadi (kuniga bir marta, qo'lda),
OpenRouter broker va driver chatini yuritadi.

**Byudjet endi chatga emas, KALITGA tegishli.** Ikkala chat bitta kalitda bo'lsa —
bitta umumiy hisob; boshqa kalitda bo'lsa — ikkita alohida. Buni kod emas, `.env`
hal qiladi. Hozir sizda ikkita kalit turibdi, ya'ni ikkita hamyon.

Kunlik ulush qat'iy raqam emas: bugun kim dispetcherlik qilgan bo'lsa, byudjet
shunga bo'linadi. Bitta talaba yolg'iz ishlasa — hammasi uniki.

### Lug'atni model yozadi, qatorlarni kod quradi

`npm run refresh:vocabulary` — Groq yangi yuk nomlari, ism-familiyalar, sotuvchi
nomlari va servis izohlarini yozadi, qattiq tekshiruvdan o'tkaziladi va
`scripts/seed/vocabulary.generated.json` ga yoziladi. Generatsiyaning o'zi
**bitta ham model chaqirmaydi** — test buni majburlaydi.

Model yoza olmaydigan ro'yxatlar sababi bilan yozilgan (`vocabularySchema.js`,
`FIXED`): truck make/model — haqiqiy texnika, shaharlar — koordinatali, brokerlar —
kredit reytingi biriktirilgan.

### Deploy tayyorligi

`DEPLOY.md` yozildi. Ikkita jadval:

| Ish | Qanchada bir | Kim chaqiradi |
|---|---|---|
| `/ops/tick` | har daqiqada | **tashqi rejalashtiruvchi** (cron-job.org) |
| `/ops/refresh` | kuniga bir | Vercel cron |

### Topilgan xatolar (hammasi tuzatilgan)

1. **`.env.bak-20260902` git kuzatuvida edi** — Neon production paroli, JWT siri,
   ikkita Groq kaliti, OpenRouter kaliti. 11 kundan beri lokal tarixda. Push
   qilinmagan tarix qayta yozildi, `.gitignore` endi `.env*`.
2. **`.env.example` ichida jonli Groq kaliti** — commit qilinishi kerak bo'lgan
   faylda. Tozalandi.
3. **Kunlik refresh Vercel'da hech qachon ishlamasdi.** `startJobs()` faqat
   `server.js`dan chaqiriladi, Vercel esa uni import qilmaydi. Board bir kundan
   keyin jimgina bo'shab qolardi.
4. **`vercel.json` deployni rad ettirardi** — tick `* * * * *`, Hobby ruxsat
   bermaydi.
5. **`reset:company` yangi jadvallarni bilmasdi.** `alert_acks` umuman omon
   qolardi — eski kompaniyada yopilgan ogohlantirishlar yangisida ham yopiq.
6. **Reasoning modeli bo'sh javob qaytarardi.** `max_tokens: 220` bitta raqam
   bilan ikkita ish qilardi: uslub chegarasi va xarajat chegarasi. Reasoning
   modeli uni avval o'z fikriga sarflardi. Ikkiga ajratildi.
7. **`chat:smoke` ancha vaqtdan beri buzuq edi** — `sendMessage` broker javobini
   ataylab qaytarmaydi (kechiktirilgan yetkazish), skript esa uni olmoqchi edi.
8. **`chat:diag` o'zi o'lchayotgan byudjetni yeb qo'yardi** — har bir bepul
   modelni haqiqiy chaqiruv bilan sinardi.
9. **Aylanma import**: `vocabulary → vocabularySchema → generate → vocabulary`.
   Ilova ishga tushishi import tartibiga bog'liq edi.
10. **Login sahifasi 9 MB rasm bilan ochilardi.** 13.34 MB → 0.53 MB.
11. **dry-van board'ning 45%i, lekin reefer bilan bir xil 20 ta yuk nomi** —
    takror tasodif emas, bo'linish edi. Endi 30 ta.
12. **`serviceNotes` jumlani so'z o'rtasidan kesardi** (`.slice(0, 200)`).

### Holat

- Testlar: **163/163**
- Backend: **12 ta commit** push kutmoqda
- Frontend: **9 ta commit** push kutmoqda
- Ikkala repo ham toza (commit qilinmagan o'zgarish yo'q)

---

## 2. Ertaga — tartib bo'yicha

### Qadam 1. Push (5 daqiqa)

GitHub men turgan muhitdan bloklangan (`403 from proxy`), shuning uchun buni
o'zingiz qilasiz:

```powershell
cd C:\Users\atxam\OneDrive\Desktop\logistika\backend ; git push origin main
cd ..\frontend ; git push origin main
```

Push'dan keyin GitHub'da tarixni ko'rib chiqing — `.env.bak-20260902` **yo'q**
bo'lishi kerak. Ishonch hosil qilgach:

```powershell
cd ..\backend ; git tag -d backup-before-secret-scrub
```

**Undan oldin o'chirmang** — bu eski tarixga qaytishning yagona yo'li.

### Qadam 2. Production bazasi (15 daqiqa)

`.env`da izohga olingan Neon URL bor. Uni ishlating yoki yangi baza oching.

```powershell
$env:DATABASE_URL="<production url>"
npm run migrate
npm run sql:check      # 89 ta bo'lishi kerak
npm run refresh:postings
```

Oxirgisi shart — busiz birinchi foydalanuvchi bo'sh board ko'radi.

### Qadam 3. Vercel (20 daqiqa)

`DEPLOY.md` ichidagi o'zgaruvchilar ro'yxati. Eng muhimi:
`OPS_TICK_SECRET` va `CRON_SECRET` — **bir xil qiymat**.

Deploy'dan keyin darhol tekshiring:

```powershell
curl -H "x-ops-secret: <sir>" https://<backend>.vercel.app/ops/tick
curl -H "x-ops-secret: <sir>" https://<backend>.vercel.app/ops/refresh
```

Birinchisi nollar qaytarsa — yaxshi, tick ishladi.
Ikkinchisi `{"outcome":"healthy"}` yoki `"cooldown"` qaytarsa — yaxshi.

### Qadam 4. Tashqi rejalashtiruvchi (10 daqiqa)

cron-job.org: har daqiqada `GET /ops/tick`, sarlavha `x-ops-secret`.

**Busiz yuklar yetkazilmaydi va pul umuman harakatlanmaydi.** Bu deploy'ning eng
oson unutiladigan qadami.

### Qadam 5. Birgalikda sinash

Siz brauzerda ishlatasiz, men `chat:usage` va loglarni kuzataman:

```powershell
npm run chat:usage -- --watch
```

Nimaga qarash kerak:
- **Kutayotgan javoblar soni tushayaptimi** — tushmasa, tick to'xtagan
- **Byudjet qanday sarflanayapti** — 45 ta tez tugaydi
- **Broker reytingga mos javob beryaptimi** — A tez, D sekin va ishonchsiz

---

## 3. Hal qilinmagan savollar

### Ikkita OpenRouter kaliti haqiqatan 90 ta beradimi?

OpenRouter hujjati aytadi: *"Making additional accounts or API keys will not
affect your rate limits, as we govern capacity globally."* Ya'ni 45+45 = 90
bo'lmasligi mumkin.

Ilova 90 deb o'ylaydi. Provayder 50 da to'xtasa — ekran endi to'g'ri gapiradi
(kvota 429 alohida ajratiladi), lekin test tugaydi. **Amalda ko'rinadi.**

Agar 50 bo'lib chiqsa: $10 kredit → 1,000. Bu yagona haqiqiy yechim.

### Model sifati taqqoslanmagan

`nex-agi/nex-n2.5-mini:free` bitta javob berdi va u yaxshi edi. Lekin
`npm run chat:compare` hali ishlatilmagan — u to'rtta modelni **asl broker
promptida** yonma-yon qo'yadi va "leaked reasoning" tekshiruvini o'tkazadi.

Har bir taqqoslash 4 ta so'rov yeydi (45 tadan). Byudjet muammosi hal
bo'lgandan keyin qilgan ma'qul.

### Kalitlarni yangilash kerakmi

`.env.bak-20260902` hali diskda, jonli kalitlar bilan. GitHub'ga chiqmagan.
Lekin papka OneDrive'da — ya'ni fayl Microsoft bulutida ham bor.

Bu sizning qaroringiz, tozalash qadami emas.

---

## 4. Keyinga qoldirilganlar (shoshilinch emas)

- `avgDaysToPay` to'lanmagan hisob-fakturalar uchun hali ham qat'iy 30 kun
- `trucks.fuel_pct`, `truck_daily_metrics`, `maintenance_records` — ishlash
  vaqtida ularga hech kim yozmaydi
- 5 ta `useMemo` hech narsa qilmaydi
- lint qamrovi `.claude/skills` ni chetlab o'tadi
- qolgan rasmlar ham WebP'ga o'tkazilishi mumkin (~2.5 MB)
