import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCoursesStore } from '../store/useCoursesStore'
import CourseCard from '../components/CourseCard'
import { Home, Search, Compass, ArrowRight, Sparkles, BookOpen } from 'lucide-react'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const { getAllCourses, setSearchQuery } = useCoursesStore()
  
  const popularCourses = getAllCourses().slice(0, 4)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim())
      navigate('/')
    }
  }

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-gray-50 via-purple-50/20 to-white py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
          <span>Xatolik 404</span>
        </div>

        {/* Big 404 Visual */}
        <div className="relative mb-6">
          <h1 className="text-8xl md:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-2xl pointer-events-none">
            <span className="text-9xl font-black text-purple-600">404</span>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
          Voy! Sahifa topilmadi yoki ko'chirilgan
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base mb-8 leading-relaxed">
          Siz qidirayotgan sahifa o'chirilgan, manzili o'zgargan yoki vaqtinchalik mavjud bo'lmasligi mumkin. Xavotir olmang, quyidagi qidiruv yoki tugmalar orqali davom eting!
        </p>

        {/* Quick Search on 404 */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
          <div className="relative flex items-center shadow-lg rounded-2xl overflow-hidden border border-gray-200 bg-white focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all">
            <Search className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Qanday kurs izlayapsiz? (Python, React, AI...)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full py-3.5 px-3 text-sm text-gray-800 outline-none bg-transparent"
            />
            <button
              type="submit"
              className="m-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"
            >
              Qidirish
            </button>
          </div>
        </form>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-purple-200 text-sm hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            Bosh sahifaga qaytish
          </Link>

          <Link
            to="/"
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-all shadow-sm text-sm hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            Kurslar katalogi
          </Link>
        </div>

        {/* Popular Courses Section */}
        {popularCourses.length > 0 && (
          <div className="border-t border-gray-200 pt-12 text-left">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Sizga ma'qul kelishi mumkin bo'lgan kurslar
                </h3>
                <p className="text-xs text-gray-500">Eng yuqori baholangan va talabgir yo'nalishlar</p>
              </div>
              <Link
                to="/"
                className="text-purple-600 hover:text-purple-700 text-sm font-semibold inline-flex items-center gap-1 hover:underline"
              >
                Barchasi <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {popularCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
