# OSHPALOV — Vercel frontend o‘quv loyihasi

Loyiha faqat HTML, CSS, JavaScript va React (CDN orqali) asosida ishlaydi. Backend, Node.js server va JSON Server ishlatilmaydi.

## Vercel’da joylash
1. GitHub’dagi `patricbateman14-jpg/OshPalov` repository’ni Vercel’ga import qiling.
2. Framework Preset: **Other**.
3. Build Command va Output Directory maydonlarini bo‘sh qoldiring (static HTML loyiha).
4. Deploy tugmasini bosing.

## Asosiy sahifalar
- `index.html` — bosh sahifa
- `menu.html` — menyu va savat
- `contacts.html` — bron qilish
- `checkout.html` — buyurtma rasmiylashtirish
- `dashboard.html` — admin/kassir boshqaruv paneli

## Ma’lumotlar
`db.json` boshlang‘ich ma’lumotlar to‘plami. `js/store.js` uni birinchi ochilishda brauzerning `localStorage` xotirasiga yuklaydi. Bronlar, buyurtmalar, sotuvlar va dashboard’dagi o‘zgarishlar shu brauzerda saqlanadi.

## Muhim cheklov
Bu backend’siz frontend demo. `localStorage` faqat aynan shu brauzer va qurilmada ishlaydi; admin kiritgan o‘zgarishlar boshqa foydalanuvchilarga sinxron tarqalmaydi. Vercel’dagi `db.json` statik fayl bo‘lib, brauzerdan serverdagi faylni o‘zgartirib bo‘lmaydi. Online karta to‘lovi ham ulanmagan.