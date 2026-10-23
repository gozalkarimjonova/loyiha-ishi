import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCoursesStore } from '../store/useCoursesStore'
import { useCartStore } from '../store/useCartStore'
import { useWishlistStore } from '../store/useWishlistStore'
import { useAuthStore } from '../store/useAuthStore'
import {
  Star,
  Clock,
  BookOpen,
  Award,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Heart,
  ShoppingBag,
  PlayCircle,
  Share2,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  User,
} from 'lucide-react'

export default function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCourseById, fetchCourses, status } = useCoursesStore()
  const { addToCart, isInCart } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { isAuthenticated } = useAuthStore()

  const [activeTab, setActiveTab] = useState('curriculum')
  const [openSection, setOpenSection] = useState(0)

  useEffect(() => {
    fetchCourses()
    window.scrollTo(0, 0)
  }, [fetchCourses, id])

  const course = getCourseById(id)

  if (status === 'loading') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Kurs topilmadi</h2>
          <p className="text-sm text-gray-500 mb-6">
            Bunday identifikatorli kurs mavjud emas yoki o'chirilgan bo'lishi mumkin.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-purple-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    )
  }

  const inCart = isInCart(course.id)
  const inWish = isInWishlist(course.id)

  const syllabusSections = [
    {
      title: "1-Bo'lim: Kursga kirish va dasturiy ta'minotni o'rnatish",
      duration: '45 daqiqa',
      lessons: [
        'Kursga xush kelibsiz! Maqsadlar va reja',
        'Ish muhitini sozlash (VS Code, Python/Node, Git)',
        'Birinchi "Salom Dunyo" loyihasini ishga tushirish',
      ],
    },
    {
      title: "2-Bo'lim: Asosiy tushunchalar va arxitektura",
      duration: '2 soat 15 daqiqa',
      lessons: [
        'Fundamental tamoyillar va ma\'lumotlar turlari',
        'Shartli operatorlar va sikllar bilan ishlash',
        'Funksiyalar va modulli dasturlash',
        'Xatoliklarni ushlash va debugging san\'ati',
      ],
    },
    {
      title: "3-Bo'lim: Ilg'or texnologiyalar va amaliy loyiha",
      duration: '4 soat 30 daqiqa',
      lessons: [
        'REST API bilan integratsiya va ma\'lumotlar almashinuvi',
        'Asinxron dasturlash va Promise / Async-Await',
        'Ma\'lumotlar bazasi bilan ishlash',
        'Real loyihani noldan production darajasiga chiqarish',
      ],
    },
    {
      title: "4-Bo'lim: Xulosa, Sertifikat va Karyera maslahatlari",
      duration: '1 soat',
      lessons: [
        'CV va Portfolioni to\'g\'ri shakllantirish',
        'Texnik suhbatlardan muvaffaqiyatli o\'tish sirlari',
        'Xalqaro sertifikatni yuklab olish',
      ],
    },
  ]

  const handleBuyNow = () => {
    if (!inCart) {
      addToCart(course)
    }
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Dark Hero Header */}
      <section className="bg-slate-950 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-purple-300 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Bosh sahifa
            </Link>
            <span>/</span>
            <Link to="/" className="hover:text-white transition-colors">
              Kurslar
            </Link>
            <span>/</span>
            <span className="text-gray-400 line-clamp-1">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-4">
              {course.badge && (
                <span className="bg-amber-400 text-gray-950 text-xs font-black px-2.5 py-0.5 rounded shadow-sm inline-block uppercase tracking-wider">
                  {course.badge}
                </span>
              )}

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                {course.title}
              </h1>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {course.description ||
                  "Ushbu to'liq va amaliy kurs sizga sohaning eng zamonaviy texnologiyalari orqali professional dasturchi bo'lib yetishishingizda yordam beradi."}
              </p>

              {/* Course Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-purple-200 pt-2">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Star className="w-4 h-4 fill-amber-300" />
                  <span>{course.rating}</span>
                  <span className="text-gray-400 font-normal">
                    ({course.reviews?.toLocaleString()} ta sharh)
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  <span>
                    Muallif: <strong className="text-white underline">{course.author}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-purple-400" />
                  <span>O'zbek / Rus tillarida</span>
                </div>

                {course.level && (
                  <span className="bg-white/10 px-2 py-0.5 rounded text-white font-medium">
                    {course.level}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sticky Enrollment Card Layout */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* What you'll learn Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>Ushbu kursda nimalarni o'rganasiz?</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {(course.skills && course.skills.length > 0
                  ? [
                      ...course.skills.map((s) => `${s} texnologiyasini chuqur o'rganish`),
                      "Real loyihalarni arxitektura qilish",
                      "Amaliy portfolioga kiritiladigan 3+ ta to'liq loyiha",
                      "Xalqaro IT standartlariga mos kod yozish madaniyati",
                    ]
                  : [
                      "Zamonaviy texnologiyalarni noldan professional darajagacha egallash",
                      "Real va qiziqarli amaliy topshiriqlar bajarish",
                      "Texnik suhbatlarga tayyorlanish sirlari",
                      "Mentorlar bilan doimiy muloqot va savol-javob",
                    ]
                ).map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-gray-900">Kurs dasturi</h3>
                  <p className="text-xs text-gray-500">
                    {syllabusSections.length} bo'lim • {course.lectures || 24} dars • {course.hours || 18} soat umumiy davomiylik
                  </p>
                </div>

                <button
                  onClick={() => setOpenSection(openSection === -1 ? 0 : -1)}
                  className="text-xs font-bold text-purple-600 hover:text-purple-700"
                >
                  {openSection === -1 ? "Barchasini ochish" : "Yopish"}
                </button>
              </div>

              <div className="space-y-3">
                {syllabusSections.map((sec, idx) => {
                  const isOpen = openSection === idx || openSection === -1
                  return (
                    <div
                      key={idx}
                      className="border border-gray-100 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenSection(isOpen ? -2 : idx)}
                        className="w-full p-4 bg-gray-50/70 hover:bg-gray-100 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <ChevronDown
                            className={`w-4 h-4 text-gray-500 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                          <span className="text-xs sm:text-sm font-bold text-gray-900">
                            {sec.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-500 shrink-0 font-medium">
                          {sec.duration}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white space-y-2.5 border-t border-gray-100">
                          {sec.lessons.map((lesson, lIdx) => (
                            <div
                              key={lIdx}
                              className="flex items-center justify-between text-xs text-gray-700 hover:text-purple-600 py-1"
                            >
                              <div className="flex items-center gap-2">
                                <PlayCircle className="w-3.5 h-3.5 text-purple-500" />
                                <span>{lesson}</span>
                              </div>
                              <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded font-mono">
                                12:45
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Instructor Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-gray-900">O'qituvchi haqida</h3>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                  alt={course.author}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-500/20 shadow-md"
                />
                <div>
                  <h4 className="text-base font-bold text-gray-900">{course.author}</h4>
                  <p className="text-xs text-purple-600 font-medium">
                    Katta dasturchi & Professional mentor
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>★ 4.9 O'qituvchi reytingi</span>
                    <span>• 45,000+ O'quvchi</span>
                    <span>• 12 ta kurs</span>
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                10+ yillik xalqaro IT tajribasiga ega yetakchi mutaxassis. Dunyo bo'ylab minglab
                o'quvchilarga dasturlash va sun'iy intellekt sohalarini noldan o'rgatgan.
              </p>
            </div>
          </div>

          {/* Sticky Enrollment Card Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              {/* Video Preview Card */}
              <div className="relative h-48 bg-slate-900 group cursor-pointer">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                  <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-8 h-8 text-white fill-white/20" />
                  </div>
                  <span className="text-xs font-bold mt-2 tracking-wide">
                    Kurs treylerini ko'rish
                  </span>
                </div>
              </div>

              {/* Price & CTAs */}
              <div className="p-6 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-gray-900">${course.price}</span>
                  {course.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${course.oldPrice}
                    </span>
                  )}
                  {course.oldPrice && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                      {Math.round((1 - course.price / course.oldPrice) * 100)}% chegirma
                    </span>
                  )}
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-md shadow-amber-200 flex items-center justify-center gap-2"
                  >
                    <span>Hozir xarid qilish</span>
                  </button>

                  <button
                    onClick={() => inCart ? navigate('/checkout') : addToCart(course)}
                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                      inCart
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{inCart ? "Savatda mavjud (Checkout)" : "Savatga qo'shish"}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(course)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-colors ${
                      inWish
                        ? 'border-rose-200 bg-rose-50 text-rose-600'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-rose-500' : ''}`} />
                    <span>{inWish ? "Sevimlilarda bor" : "Sevimlilarga saqlash"}</span>
                  </button>
                </div>

                {/* Guarantees */}
                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                  <p className="font-bold text-gray-900">Kurs quyidagilarni o'z ichiga oladi:</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{course.hours || 18} soat to'liq video kontent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>{course.lectures || 30} ta amaliy mashg'ulot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>30 kunlik pulni qaytarish kafolati</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Tugatgandan so'ng xalqaro sertifikat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
