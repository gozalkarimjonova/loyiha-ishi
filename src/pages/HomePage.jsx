import { useEffect } from 'react'
import { useCoursesStore } from '../store/useCoursesStore'
import HeroBanner from '../components/HeroBanner'
import CategoryBar from '../components/CategoryBar'
import CourseCard from '../components/CourseCard'
import CourseQuickViewModal from '../components/CourseQuickViewModal'
import {
  Sparkles,
  Flame,
  Search,
  BookOpen,
  Award,
  Clock,
  ShieldCheck,
  CheckCircle,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react'

// Helper: match category
function matchesCategory(course, category) {
  if (!category || category === 'All' || category === 'Hammasi') return true
  const cTitle = (course.title || '').toLowerCase()
  const cDesc = (course.description || '').toLowerCase()
  const skills = (course.skills || []).map((s) => s.toLowerCase())
  const target = category.toLowerCase()

  return (
    cTitle.includes(target) ||
    cDesc.includes(target) ||
    skills.some((s) => s.includes(target))
  )
}

// Helper: sort courses
function sortCourses(courses, sortBy) {
  const sorted = [...courses]
  if (sortBy === 'rating') {
    return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }
  if (sortBy === 'price-low') {
    return sorted.sort((a, b) => (a.price || 0) - (b.price || 0))
  }
  if (sortBy === 'price-high') {
    return sorted.sort((a, b) => (b.price || 0) - (a.price || 0))
  }
  if (sortBy === 'popular') {
    return sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
  }
  return sorted
}

export default function HomePage() {
  const {
    sections,
    status,
    searchQuery,
    setSearchQuery,
    activeCategory,
    sortBy,
    fetchCourses,
    getAllCourses,
  } = useCoursesStore()

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const allCourses = getAllCourses()
  const isSearching = searchQuery.trim().length > 0

  // Filter for search
  const searchResults = isSearching
    ? sortCourses(
        allCourses.filter(
          (c) =>
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (c.skills || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        sortBy
      )
    : []

  // Filter sections by active category and apply sorting
  const filteredSections = sections
    .map((section) => {
      const filtered = section.courses.filter((c) => matchesCategory(c, activeCategory))
      return {
        ...section,
        courses: sortCourses(filtered, sortBy),
      }
    })
    .filter((s) => s.courses.length > 0)

  // Loading State
  if (status === 'loading') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50/50">
        <div className="w-14 h-14 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin mb-4" />
        <h3 className="text-lg font-bold text-gray-800">Kurslar yuklanmoqda...</h3>
        <p className="text-sm text-gray-500">Iltimos, bir necha soniya kuting</p>
      </div>
    )
  }

  // Error State
  if (status === 'failed') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-100 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ma'lumotlarni yuklab bo'lmadi</h2>
          <p className="text-sm text-gray-600 mb-6">
            Internet aloqangizni yoki ma'lumotlar manzilini tekshirib qayta urinib ko'ring.
          </p>
          <button
            onClick={() => fetchCourses()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm shadow-md shadow-purple-200"
          >
            Qayta yuklash
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col">
      {/* Hero Banner (visible when not searching) */}
      {!isSearching && <HeroBanner />}

      {/* Sticky Categories Bar */}
      <CategoryBar />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-10 flex-1 w-full" id="courses-section">
        {/* Value Proposition Highlights */}
        {!isSearching && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              {
                icon: <Award className="w-5 h-5 text-amber-500" />,
                title: 'Xalqaro Sertifikat',
                desc: 'Har bir kurs bitiruvchisiga',
              },
              {
                icon: <Clock className="w-5 h-5 text-purple-600" />,
                title: 'Cheksiz Kirish',
                desc: "Bir marta to'lab umrbod o'rganing",
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
                title: 'Kafolatlangan Sifat',
                desc: '30 kunlik to\'liq kafolat',
              },
              {
                icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
                title: 'Amaliy Loyihalar',
                desc: 'Portfolio uchun real ishlar',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">{item.title}</h4>
                  <p className="text-[11px] text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search Results Display */}
        {isSearching ? (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <Search className="w-6 h-6 text-purple-600" />
                  <span>"{searchQuery}" bo'yicha qidiruv natijalari</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Jami {searchResults.length} ta mos kurs topildi
                </p>
              </div>

              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition-colors"
              >
                Filtrni tozalash
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-400 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Mos kurslar topilmadi</h3>
                <p className="text-xs text-gray-500 mb-6">
                  "{searchQuery}" so'rovi bo'yicha hech narsa topilmadi. Boshqa kalit so'z bilan qidiring yoki barcha kurslarni ko'ring.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Barcha kurslarni ko'rsatish
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Normal Sections */
          <div className="space-y-14">
            {filteredSections.map((section) => (
              <div key={section.id} className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                      <Flame className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                        {section.title || "Eng mashhur va tavsiya etilgan kurslar"}
                      </h2>
                      <p className="text-xs text-gray-500">
                        Eng yuqori baholangan va amaliyotga boy ta'lim dasturlari
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    {section.courses.length} ta kurs
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {section.courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Motivational Banner */}
        {!isSearching && (
          <div className="mt-16 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-purple-500/20">
            <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-gray-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Maxsus Taklif</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
                IT karyerangizni bugunoq yangi bosqichga olib chiqing
              </h3>
              <p className="text-purple-200 text-sm sm:text-base leading-relaxed">
                Zamonaviy bilimlarga ega bo'ling, amaliy loyihalar bajaring va xalqaro
                sertifikatga ega bo'lib yangi ish imkoniyatlarini kashf eting.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#courses-section"
                  className="bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg text-sm"
                >
                  Barcha kurslarni o'rganish
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Quick View Modal */}
      <CourseQuickViewModal />
    </div>
  )
}
