# 🎓 SkillUp — Zamonaviy IT Kurslar Platformasi

Ushbu loyiha zamonaviy onlayn ta'lim platformasi bo'lib, eng so'nggi texnologiyalar va yuqori darajadagi UI/UX dizayn asosida qayta ishlab chiqildi.

---

## 🚀 Yangi Qo'shilgan Imkoniyatlar va Kutubxonalar

1. **Zustand (Global Holat Boshqaruvi)**
   - `useAuthStore.js`: Avtorizatsiya, login, ro'yxatdan o'tish, 1-klikli Demo talaba rejimi, kurslarga yozilish, `localStorage` persistenti.
   - `useCartStore.js`: Savat, narxlarni hisoblash, promokodlar va chegirmalar, `localStorage` persistenti.
   - `useWishlistStore.js`: Sevimlilar ro'yxati, savatga o'tkazish, `localStorage` persistenti.
   - `useCoursesStore.js`: Kurslar, jonli qidiruv, kategoriyalar va tartiblash filtrlari.
   - `useToastStore.js`: Chiroyli suzuvchi (toast) bildirishnomalar tizimi.

2. **React Router DOM & Himoyalangan Marshrutlar (Protected Routes)**
   - `ProtectedRoute.jsx`: Tizimga kirmagan foydalanuvchini avtomatik ravishda `/login` sahifasiga yo'naltiradi va kirgandan so'ng yana o'sha sahifaga qaytaradi.
   - `/dashboard` (Himoyalangan): Talabaning shaxsiy kabineti, yozilgan kurslari, darslar o'zlashtirish foizi va xalqaro sertifikatlari.
   - `/checkout` (Himoyalangan): Xarid qilish sahifasi, to'lov turlari (Payme, Click, Uzum, Visa/MC), promokod tizimi va konfetti animatsiyasi.
   - `/learn/:courseId` (Himoyalangan): Interaktiv dars ko'rish xonasi, darslarni belgilash va shaxsiy qaydlar yozish.

3. **404 Not Found Sahifasi (`/404` va `*`)**
   - Zamonaviy gradient va 404 tipografiyasi.
   - Sahifaning o'zida jonli kurs qidirish tizimi.
   - Bosh sahifa va katalogga qaytish tugmalari.
   - Tavsiya etilgan mashhur kurslar bloklari.

4. **Kutubxonalar va Stil (UI/UX)**
   - `lucide-react`: Zamonaviy, yengil va tiniq SVG vektor ikonkalari.
   - `canvas-confetti`: To'lov va darslarni yakunlaganda bayramona mushakbozlik animatsiyasi.
   - `tailwindcss` (v4): Professional ranglar palitrasi, mikro-animatsiyalar, chiroyli scrollbar va responsive dizayn.
   - Tezkor ko'rish (Quick View Modal): Sahifadan chiqmasdan kurs tafsilotlarini ko'rish.

---

## 🛠 Ishga tushirish

```bash
# Loyiha papkasiga o'ting
cd "loyha ishi"

# Bog'liqliklarni o'rnatish (o'rnatilgan bo'lsa shart emas)
npm install

# Dasturni ishga tushirish
npm run dev

# Production build qilish
npm run build
```

---

## 🔑 Demo hisob bilan sinash

- Saytdagi **"Demo kirish"** tugmasini bosing yoki `/login` sahifasidagi **"Bir klikda Demo kirish"** tugmasi orqali parolsiz bir zumda kiring!
- Savatda **`ILM2026`** promokodini kiritib qo'shimcha 20% chegirmaga ega bo'ling.
