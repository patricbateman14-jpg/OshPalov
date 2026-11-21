# OSHPALOV — Vercel frontend o‘quv loyihasi

Loyiha faqat HTML, CSS, JavaScript va React’dan foydalanadi. Backend, JSON Server va API server mavjud emas.

## Vercel
- Framework Preset: Other
- Build Command: bo‘sh qoldiring
- Output Directory: .
- Root Directory: /

`db.json` boshlang‘ich ma’lumotlar fayli; brauzer birinchi ochilganda u localStorage’ga olinadi.

## Ishlash tartibi
- Saytni Vercel yoki lokal static server orqali oching (file:// orqali emas).
- `dashboard.html` — admin/kassir paneli.
- Admin/kassir ma’lumotlarni qo‘shishi, tahrirlashi va o‘chirishi mumkin.
- Buyurtmalar va bronlar shu brauzerning localStorage xotirasiga yoziladi.
- Savat ham localStorage’da saqlanadi.

## Muhim cheklov
Bu backend’siz frontend demo. localStorage faqat aynan shu brauzer va qurilmada ishlaydi; admin kiritgan o‘zgarishlar boshqa foydalanuvchilarga sinxron tarqalmaydi. Vercel’dagi db.json statik fayl bo‘lib, unga brauzerdan yozib bo‘lmaydi.