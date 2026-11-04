# 1-hafta · 1-dars
# Bitta yuk — bir jamoa

## AQSh logistikasida kim nima qiladi?

**Yo‘nalish:** Dispatch va Update · **Davomiylik:** 110 daqiqa · **Boshlanish darajasi:** logistika bo‘yicha oldingi bilim talab qilinmaydi; ingliz tili B1+/B2.

Bugun yukni olib ketadigan truck qayerdan paydo bo‘lishini, broker kimga murojaat qilishini va updater nima uchun driver bilan bog‘lanishini bilib olasiz. Bitta yuk misolida butun jarayonni kuzatasiz. Bu dars mustaqil ishlash malakasini to‘liq bermaydi; keyingi darslar uchun asos yaratadi.

### Dars oxirida siz

- Yetti asosiy rolni bir-biridan ajratasiz.
- Yukning qidiruvdan yetkazib berishgacha yo‘lini aytib berasiz.
- Tasdiqlangan ma’lumot bilan taxminni ajratasiz.
- Load ID, holat, vaqt va keyingi qadamni qo‘shib oddiy update yozasiz.

### Dars yo‘li — 110 daqiqa

1. Kirish va birinchi rasm — 10 daqiqa.
2. Rollar va ularning chegaralari — 20 daqiqa.
3. Yukning bosqichlari va hujjatlar — 20 daqiqa.
4. Tanaffus — 5 daqiqa.
5. Bir yukni birga kuzatish — 20 daqiqa.
6. Inglizcha muloqot va boshqariladigan mashqlar — 15 daqiqa.
7. Mustaqil vazifa, javoblar va yakun — 20 daqiqa.

## 1. Avval katta manzarani ko‘ramiz

Tasavvur qiling: zavod tayyor mahsulotini boshqa shahardagi omborga yubormoqchi. Mahsulot o‘zidan-o‘zi ko‘chmaydi. Yukni tayyorlash, tashishni tashkil qilish, transport ajratish, haydash va qabul qilish vazifalarini turli odamlar bajaradi.

**Load** — bu darsda tashish uchun berilgan bitta yuk buyurtmasi. Unda qayerdan olish, qayerga yetkazish, qachon borish va qanday transport kerakligi ko‘rsatiladi. Bir load bir nechta quti yoki palletdan iborat bo‘lishi mumkin; “bitta load” degani “bitta quti” emas.

![Rollar xaritasi: yuk shipperdan carrier transportida receiverga boradi; broker tashishni tashkil qiladi, carrier jamoasida dispatcher, updater va driver ishlaydi.](roles.svg)

**Rasmni qanday o‘qiymiz?** Yuqoridagi chiziq yukning jismoniy harakatini, pastdagi bog‘lanishlar ishni tashkil qilish va axborot almashishni ko‘rsatadi. Broker yukni o‘zi haydab bormaydi. Carrier tashishni bajaradi. Aloqa yo‘llari kompaniya tartibiga qarab o‘zgarishi mumkin; rasm boshlang‘ich modeldir.

## 2. Kim nima qiladi?

### Shipper — yukni jo‘natuvchi tomon

Yukni jo‘natishga topshiradi yoki jo‘natish nuqtasini boshqaradi. Pickup manzili zavod, ombor yoki boshqa korxona bo‘lishi mumkin. Yukning tayyorligi, olish tartibi va jo‘natish hujjatlari shu nuqta bilan bog‘liq. Shipper har doim mahsulotni ishlab chiqargan zavodning o‘zi bo‘lavermaydi.

**Misol:** driver yuk olish uchun zavod darvozasiga keladi. Bu — shipperdagi pickup.

### Broker — tashishni tashkil qiluvchi vositachi

Yuk tashishga ehtiyoji bor tomon bilan carrier o‘rtasida tashishni tashkil qiladi. Carrier bilan narx, manzil va vaqt kabi shartlarni kelishadi, jarayon haqida xabar oladi. Broker va carrier — bir xil vazifa emas: bu modelda broker tashishni tashkil qiladi, carrier esa yukni tashiydi.

**Misol:** broker dispatcherga pickup va delivery ma’lumotlarini yuborib, truck mavjudligini so‘raydi.

### Carrier — tashuvchi kompaniya

Yukni tashishni zimmasiga olgan tomon. Carrier truck va driver ishini tashkil qiladi. Ushbu darsda dispatcher va updater carrier jamoasida ishlaydi. Haqiqiy kompaniyalarda rollar bir xodimda birlashishi yoki alohida xizmat orqali bajarilishi mumkin.

**Misol:** carrier yukni olib ketish uchun driver va mos transport ajratadi.

### Dispatcher — yuk va transport ishini muvofiqlashtiruvchi

Truck qayerda va qachon bo‘shashini aniqlaydi, mos load izlaydi, broker bilan shartlarni aniqlashtiradi, kelishilgan hujjatni tekshiradi va driverga yo‘l-yo‘riq yuboradi. “Yuk topdim” bilan ish tugamaydi: driverga manzil, appointment, reference va aloqa ma’lumotlari aniq yetishi kerak.

Dispatcher tasdiqlanmagan narxni kelishildi deb yozmaydi, moslikni tekshirmasdan yukni qabul qilmaydi. Tasdiqlash vakolati kompaniya tartibiga bog‘liq.

### Updater — holatni kuzatuvchi va xabar qiluvchi

Driverdan yoki tasdiqlangan kuzatuv manbasidan joylashuv va holatni oladi, muhim o‘zgarishlarni brokerga yetkazadi, hujjatlarni so‘raydi va yozuvlarni yangilaydi. Update — shunchaki “all good” emas; tekshirilgan holat va keyingi qadamni bildiradi.

Updater yangi rate yoki appointment’ni o‘zicha tasdiqlamaydi. Kechikish xavfi, aloqa uzilishi yoki ma’lumotlar mos kelmasligini dispatcher yoki mas’ul rahbarga olib chiqadi. Xabar berish muddati va kanali kompaniyaning tartibiga muvofiq bo‘ladi.

### Driver — haydovchi

Transportni boshqaradi, joydagi check-in jarayonini bajaradi va holat haqida ma’lumot beradi. Loading tugagani, hujjat olingani va yo‘lga chiqqani bir xil hodisa emas; driverdan aynan qaysi biri yuz berganini so‘rang. Haydash vaqtida javob talab qilmang; xavfsiz bog‘lanish usulidan foydalaning.

### Receiver — yukni qabul qiluvchi tomon

Delivery nuqtasida yukni qabul qiladi yoki qabul qilish jarayonini boshqaradi. Bu boshqa ombor, do‘kon taqsimot markazi yoki korxona bo‘lishi mumkin. Yukni jo‘natuvchi va oluvchi turli manzillardagi bir kompaniyaga ham tegishli bo‘lishi mumkin.

**Esda tuting:** shipper jo‘natadi → carrier tashiydi → receiver qabul qiladi. Broker tashishni tashkil qiladi; dispatcher va updater uning bajarilishini carrier tomonida muvofiqlashtiradi.

## 3. Bitta yukning to‘liq yo‘li

![Yuk jarayoni: qidiruv, booking, rate confirmation, driverga topshiriq, bo‘sh borish, check-in, loading va BOL, yo‘ldagi kuzatuv, delivery va POD.](lifecycle.svg)

### 1 — Load search: mos yukni izlash

Dispatcher truck mavjudligi, joylashuvi, kerakli jihoz va vaqtga mos takliflarni ko‘radi. Load board — takliflar e’lon qilinadigan joy; e’lonni ko‘rish yukni band qilish degani emas.

### 2 — Booking: shartlarni kelishish

Broker bilan yuk mavjudligi, manzillar, appointment, jihoz va boshqa shartlar aniqlashtiriladi. Og‘zaki gap bilan hujjat bir-biriga mos bo‘lishi kerak. “Yukni oldik” deb aytishdan oldin kompaniya tasdiqlash tartibini bajaring.

### 3 — Rate confirmation: yozma shartlarni tekshirish

Ko‘pincha **rate con** deyiladi. Unda kelishilgan tashish ma’lumotlari va rate bo‘ladi. Load ID, carrier, manzillar, sana-vaqt va shartlarni tekshiring. Nomuvofiqlik bo‘lsa aniqlashtiring; hujjatni o‘zingizcha tuzatib tasdiqlamang. Hujjat tarkibi brokerga qarab farqlanadi.

### 4 — Dispatch: driverga aniq topshiriq

Dispatcher driverga pickup va delivery manzili, sana-vaqti, reference, kerakli izoh va kontaktlarni yuboradi. Driver ma’lumotni olgani va tushunganini tasdiqlashi kerak. Booking — broker bilan kelishish; dispatch — driver ishini yo‘lga qo‘yish.

### 5 — Empty travel: yuk olish joyiga bo‘sh borish

Truck hali shu load’ni ortmagan holda pickup tomon boradi. Bu qatnovning bo‘sh masofasi **deadhead** deb ataladi. “Heading to pickup” hali “loaded” degani emas.

### 6 — Arrival va check-in

Driver manzilga yetadi va korxona tartibi bo‘yicha ro‘yxatdan o‘tadi. “Arrived” — yetib keldi; “checked in” — kirish jarayonida qayd qilindi. Darvozaga yetish yuk ortish boshlanganini anglatmaydi.

### 7 — Loading va BOL

Yuk ortiladi. **BOL — Bill of Lading**: yuk va tashishga oid ma’lumotlarni qayd etuvchi hujjat. Unda yozilgan ma’lumotlar topshiriqqa mosligini tekshirish muhim. Loading tugashi, hujjat tayyor bo‘lishi va departure alohida vaqtlarda yuz berishi mumkin. Mos kelmagan ma’lumot yoki zarar belgisi bo‘lsa mas’ul kishiga xabar bering.

### 8 — In transit: yuk yo‘lda

Driver yuk bilan delivery tomon ketadi. Updater kelishilgan tartibda holatni tekshiradi. **ETA — Estimated Time of Arrival**, ya’ni kutilayotgan kelish vaqti. Bu kafolat emas; manba va yangilangan vaqt bilan beriladi. Ma’lumot yetarli bo‘lmasa ETA to‘qimang.

### 9 — Delivery va POD

Driver receiverga yetadi, check-in qiladi va yuk tushiriladi. Arrival hali delivery tugadi degani emas. **POD — Proof of Delivery** yetkazib berilganini qayd etuvchi dalil; ko‘pincha qabul qiluvchi imzolagan BOL yoki delivery receipt bo‘ladi. POD alohida nomli yangi blank bo‘lishi shart emas.

Delivery yakunlangani tasdiqlanadi, kerakli imzo va qaydlar ko‘riladi, o‘qiladigan hujjat tegishli kanalga topshiriladi. Ushbu dars shu nuqtada tugaydi; invoicing keyingi moliyaviy jarayondir.

## 4. Lug‘at: bugungi ish so‘zlari

- **Load:** tashish buyurtmasi. “Please confirm the load ID.”
- **Pickup:** yuk olish. “Pickup is in Dallas.”
- **Delivery:** yuk yetkazish. “Delivery is in Atlanta.”
- **Appointment:** belgilangan kelish vaqti. “Please confirm the appointment time.”
- **Rate:** kelishilgan tashish haqi. “Please send the rate confirmation.”
- **Dispatch details:** driverga yuboriladigan ish ma’lumotlari.
- **Deadhead:** yuk olishga borishdagi bo‘sh masofa.
- **Check-in:** joydagi kirish yoki qayd jarayoni. “The driver is checked in.”
- **Loaded:** yuk ortilgan. **Departed:** manzildan chiqib ketgan.
- **In transit:** yuk yo‘lda. **ETA:** kutilayotgan kelish vaqti.
- **BOL:** yuk va tashish hujjati. **POD:** delivery bajarilganini qayd etuvchi dalil.
- **Reference number:** joyda yukni topish yoki kirish uchun ishlatiladigan raqam.
- **Update:** joriy holat haqidagi xabar. **Escalation:** masalani vakolatli xodimga olib chiqish.

## 5. Birga kuzatamiz: DS-1001

**Barcha kompaniya, ism va yuk ma’lumotlari dars uchun o‘ylab topilgan. Bu real buyurtma yoki yo‘l jadvali emas.** Masofa, rate va haydash imkoniyatini bu darsda hisoblamaymiz.

Shipper — Cedar Box Supply, Dallas, Texas. Receiver — Eastgate Warehouse, Atlanta, Georgia. Broker — Bridgeway Freight Desk. Carrier — Maple Road Carrier. Driver — Alex. Dispatcher — Maya. Updater — siz. Yuk: 12 pallet qadoqlash materiallari; yopiq tirkama — **Dry Van**.

**Vaqt qoidasi:** bu misolda Dallas vaqti **CDT (UTC−5)**, Atlanta vaqti **EDT (UTC−4)**. Atlanta bir soat oldinda. Misol sanalari 2026-yil 14–15-oktabr. Har bir appointment o‘sha manzilning mahalliy vaqti bilan yozilgan. CT/ET belgilari umumiy zonalarni anglatadi; yil davomida UTC farqi o‘zgarishi mumkin, shu sababli sana ham kerak.

- Pickup appointment: **14-oktabr, 09:00 CDT — Dallas**.
- Delivery appointment: **15-oktabr, 13:00 EDT — Atlanta**.
- Pickup reference: **PU-4512**. Load ID: **DS-1001**.

### 14-oktabr: pickup kuni

**07:30 CDT:** dispatcher truck mavjudligini driverdan tasdiqlaydi, mos yukni broker bilan kelishadi. Rate con tekshiriladi, driverga ma’lumot yuboriladi.

**08:45 CDT:** Alex xabar beradi: “I’m checked in at the shipper. Waiting for a dock.” Tasdiqlangan narsa — check-in va dock kutish. Hali loading yoki departure haqida dalil yo‘q.

**10:10 CDT:** Alex loading tugaganini aytadi. BOL hali tayyor emas. Holat: loaded, awaiting paperwork. “In transit” deb yozmang.

**10:30 CDT:** driver BOL olganini va shipperdan chiqib ketganini tasdiqlaydi. Endi departure’ni xabar qilish mumkin. Delivery ETA hali olinmagan.

### 15-oktabr: delivery kuni

**11:40 EDT:** Alex receiverga check-in qilganini tasdiqlaydi. Appointment 13:00 EDT bo‘lsa ham, oldin kelish unloading boshlanganini anglatmaydi.

**13:40 EDT:** Alex unloading tugagani va receiver imzolagan hujjatni olganini bildiradi. Updater nusxani so‘raydi, load ID va o‘qilishini tekshiradi. Hujjatga oid noma’lum holat bo‘lsa dispatcherga bildiradi.

**Vaqt mashqi:** Dallasdagi 08:45 CDT Atlanta vaqti bilan 09:45 EDT. Appointment bilan haqiqiy kelish vaqtini alohida yozing; kechagi holatni bugungi holat sifatida ko‘rsatmang.

![Update tayyorlash: tasdiqlangan faktlar, noma’lum ma’lumotlar va aniq xabar.](update.svg)

## 6. Ishdagi inglizcha muloqot

### Driverdan aniq ma’lumot olish

**Updater:** “Hi Alex, please confirm your current status for load DS-1001 when it is safe to reply. Are you checked in at the shipper?”

**Driver:** “Yes. Checked in at 08:45 CDT. Waiting for a dock.”

**Updater:** “Thank you. Please let us know when loading starts.”

Bu yerda savol aniq: qaysi load, qaysi holat. Javobni taxmin bilan to‘ldirmaymiz.

### Brokerga pickup update

“Load DS-1001: The driver confirmed check-in at the Dallas shipper at 08:45 CDT on October 14. He is waiting for a dock. We will update you when loading starts.”

Xabar load’ni, manbani, vaqtni, holatni va keyingi qadamni ko‘rsatadi. Unda tasdiqlanmagan ETA yo‘q.

### Loading tugagan, hujjat kutilmoqda

“Load DS-1001: Loading was completed at 10:10 CDT on October 14, per the driver. The driver is awaiting the BOL and has not departed.”

### ETA hali olinmagan

“Load DS-1001: The driver confirmed departure from the shipper at 10:30 CDT on October 14. The delivery ETA has not been confirmed. We are requesting an updated ETA from the driver.”

“On time” deb yozish uchun faqat appointment’ni bilish yetmaydi. Tasdiqlanmagan ETA asosida va’da bermang.

### Muammoni ichkariga olib chiqish

“Load DS-1001: The pickup time on the rate confirmation differs from the dispatch details. Please confirm the correct appointment before we proceed.”

Bu xabar muammoni yashirmaydi va vakolatdan tashqari qaror bermaydi. Xavfsizlik yoki favqulodda holatda oddiy update navbatini kutish o‘rniga kompaniyaning tegishli tartibiga amal qilinadi.

## 7. Birga bajaramiz

### A. Rolni toping — 4 daqiqa

Har gap uchun asosiy rolni yozing: 1) Yukni jo‘natadi. 2) Yuk tashishni tashkil qilib carrier bilan kelishadi. 3) Transportni boshqaradi. 4) Brokerga tasdiqlangan holatni yuboradi. 5) Yukni qabul qiladi. 6) Truck uchun mos load tanlaydi. 7) Tashishni zimmasiga olgan kompaniya.

### B. Holatni ajrating — 3 daqiqa

Driver: “I’m at the gate. I haven’t checked in yet.” Qaysi xabar to‘g‘ri: **A)** “The driver is loaded.” **B)** “The driver has arrived at the gate and has not checked in yet.” **C)** “The driver is unloading.” Javobni bitta gap bilan asoslang.

### C. Vaqt va hujjat — 3 daqiqa

Dallasda 10:30 CDT bo‘lsa, Atlantada soat nechchi? Loading tugagan, lekin BOL va departure tasdig‘i yo‘q: “in transit” yozish mumkinmi? BOL va POD bir xil maqsadni bildiradimi?

## 8. Mustaqil vazifa — o‘zingiz updater bo‘ling

DS-1001 bo‘yicha **14-oktabr, 10:10 CDT** dagi ma’lumotdan foydalaning. Appointment’lar yuqorida berilgan. Driver: “Loading is complete. I’m waiting for the BOL. I have not left yet.” Boshqa yangilik yo‘q.

1. O‘zbekcha ikki gapda dispatcher va updater ishining farqini yozing.
2. Brokerga inglizcha 2–3 gapli xabar yozing: load ID, tasdiqlangan vaqt, holat va keyingi qadam bo‘lsin.
3. Siz bilmayotgan ikki ma’lumotni yozing. Ularni xabarda fakt sifatida ishlatmang.
4. Driverga bitta aniq keyingi savol yozing.
5. Pickup’dan POD’gacha bosqichlarni tartib bilan ayting.

**Yozish qolipi:** “Load [ID]: [confirmed status] at [date, time, zone], per [source]. [What is pending]. [Next action].” Qolipni vaziyatga moslang; noma’lum maydonlarni o‘ylab to‘ldirmang.

## 9. O‘zingizni tekshiring

1. Broker bilan carrierning asosiy farqi nima?
2. Dispatcher va updater aynan bir ishni qiladimi?
3. Booking bilan dispatchning farqi nima?
4. Arrived, checked in, loaded va departed bir-birini almashtiradimi?
5. Rate con nima uchun tekshiriladi?
6. ETA tasdiqlanmagan bo‘lsa, “on time” yozish mumkinmi?
7. Delivery appointment va haqiqiy arrival bir xil vaqtmi?
8. Receiverga yetib kelish POD borligini anglatadimi?

## 10. Javoblar — avval o‘zingiz urinib ko‘ring

### Boshqariladigan mashqlar

**A:** 1 — shipper; 2 — broker; 3 — driver; 4 — updater; 5 — receiver; 6 — dispatcher; 7 — carrier. Kichik kompaniyada bir odam bir nechta vazifani bajarishi mumkin, ammo vazifalar farqi saqlanadi.

**B:** B to‘g‘ri. Driver faqat darvozaga kelganini va check-in hali bajarilmaganini tasdiqladi.

**C:** 11:30 EDT. Departure tasdig‘isiz “in transit” yozilmaydi. BOL yuk va tashishga oid hujjat; POD delivery bajarilganini qayd etadi. Receiver imzolagan BOL POD vazifasini bajarishi mumkin.

### Mustaqil vazifaga namuna

Dispatcher mos yuk va transportni muvofiqlashtiradi, shartlarni aniqlashtiradi va driverga topshiriq beradi. Updater shu yukning tasdiqlangan holatini kuzatib, tegishli odamlarga xabar qiladi.

“Load DS-1001: The driver confirmed loading was completed at 10:10 CDT on October 14. He is waiting for the BOL and has not departed. We will request confirmation once the paperwork is received and the driver leaves the shipper.”

Noma’lum ma’lumotlar: haqiqiy departure va delivery ETA. Keyingi savol: “Please confirm when you receive the BOL and depart the shipper.”

Tartib: pickup tomon borish → arrival/check-in → loading → BOL va departure tasdig‘i → in transit → receiverda arrival/check-in → unloading → delivery tasdig‘i va POD.

### Tekshiruv savollariga qisqa javoblar

1. Broker tashishni tashkil qiladi; carrier tashiydi.
2. Yo‘q. Ular bog‘liq, lekin asosiy mas’uliyatlari turli.
3. Booking broker bilan yuk shartlarini kelishish; dispatch driverga bajarish ma’lumotlarini yetkazish.
4. Yo‘q. Har biri alohida hodisa va alohida tasdiq talab qiladi.
5. Kelishilgan ma’lumot bilan yozma shartlar mosligini aniqlash uchun.
6. Yo‘q. ETA olinadi yoki hali tasdiqlanmagani ochiq yoziladi.
7. Yo‘q. Appointment — belgilangan vaqt, arrival — sodir bo‘lgan kelish.
8. Yo‘q. Yuk tushirilishi, qabul tasdig‘i va hujjat olinishi kuzatiladi.

## Dars yakuni: o‘zingizga belgi qo‘ying

- [ ] Yetti rolni rasmga qaramasdan tushuntira olaman.
- [ ] Broker tashkil qilishi va carrier tashishini ajrataman.
- [ ] Booking, dispatch, pickup, transit va delivery tartibini bilaman.
- [ ] Arrived bilan loaded, loaded bilan departed’ni aralashtirmayman.
- [ ] BOL va POD vazifalarini ayta olaman.
- [ ] Xabarimga load ID, sana-vaqt va vaqt zonasini qo‘shaman.
- [ ] Tasdiqlanmagan ETA yoki boshqa ma’lumotni o‘ylab yozmayman.
- [ ] Vakolatim yetmagan masalani mas’ul xodimga olib chiqaman.

**Keyingi dars:** truck va trailer turlari, load ma’lumotlari va manzil vaqtini o‘qish. Bugungi vazifani saqlang: keyingi darsda unga equipment va manzil tafsilotlarini qo‘shamiz.

## Manba

Broker va carrier vazifalari farqi uchun: [FMCSA — motor carrier, broker va freight forwarder ta’riflari](https://www.fmcsa.dot.gov/faq/what-are-definitions-motor-carrier-broker-and-freight-forwarder-authorities). Darsdagi ish oqimi tushuntirish uchun soddalashtirilgan; aniq vakolat va aloqa tartibi kompaniyaga bog‘liq. Barcha rasmlar ushbu qo‘llanma uchun original sxema sifatida chizilgan.
