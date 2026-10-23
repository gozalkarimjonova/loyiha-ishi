import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useCoursesStore } from '../store/useCoursesStore'
import {
  BookOpen,
  Award,
  Clock,
  PlayCircle,
  CheckCircle2,
  Settings,
  User,
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
} from 'lucide-react'

export default function DashboardPage() {
  const { user, updateProfile, toggleLessonCompleted } = useAuthStore()
  const { getAllCourses } = useCoursesStore()
  const [activeTab, setActiveTab] = useState('courses')

  // Profile edit local state
  const [name, setName] = useState(user?.name || '')
  const [title, setTitle] = useState(user?.title || '')

  const allCourses = getAllCourses()
  const enrolledCourseIds = user?.enrolledCourses || []
  const myCourses = allCourses.filter((c) => enrolledCourseIds.includes(c.id))

  const completedMap = user?.completedLessons || {}

  const handleSaveProfile = (e) => {
    e.preventDefault()
    updateProfile({ name, title })
  }

  // Calculate overall stats
  const totalCompletedLessons = Object.values(completedMap).reduce(
    (acc, list) => acc + (list?.length || 0),
    0
  )

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* User Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-purple-500/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={user?.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-purple-500/30 shadow-lg"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 bg-purple-500/20 border border-purple-400/30 text-purple-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-300" />
                  <span>Faol Talaba</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black">{user?.name}</h1>
                <p className="text-xs sm:text-sm text-purple-200">{user?.title || user?.email}</p>
                <p className="text-[11px] text-gray-400 mt-1">A'zo bo'lgan sana: {user?.joinedDate || '2025'}</p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-3 text-center border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-amber-300">
                  {myCourses.length}
                </div>
                <div className="text-[10px] text-purple-200">Faol Kurslar</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-3 text-center border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-emerald-300">
                  {totalCompletedLessons}
                </div>
                <div className="text-[10px] text-purple-200">Darslar Yakunlandi</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-3 text-center border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-indigo-300">
                  {myCourses.length > 0 ? 1 : 0}
                </div>
                <div className="text-[10px] text-purple-200">Sertifikat</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 gap-4">
          <button
            onClick={() => setActiveTab('courses')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'courses'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Mening kurslarim ({myCourses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'certificates'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Sertifikatlarim</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Profil sozlamalari</span>
          </button>
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div>
            {myCourses.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Siz hali hech qanday kursga yozilmagansiz
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Katalogdagi zamonaviy IT va dasturlash kurslaridan birini tanlang va o'rganishni boshlang!
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <span>Kurslar katalogini ko'rish</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCourses.map((course) => {
                  const completed = completedMap[course.id]?.length || 0
                  const total = course.lectures || 20
                  const percent = Math.min(100, Math.round((completed / total) * 100))

                  return (
                    <div
                      key={course.id}
                      className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all"
                    >
                      <div className="relative h-44">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/40 backdrop-blur px-2.5 py-1 rounded-lg">
                          {course.author}
                        </span>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-2 mb-3">
                          {course.title}
                        </h3>

                        {/* Progress Bar */}
                        <div className="mt-auto space-y-1.5 mb-4">
                          <div className="flex justify-between text-xs font-semibold text-gray-600">
                            <span>O'zlashtirish darajasi:</span>
                            <span className="text-purple-600 font-bold">{percent}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(8, percent)}%` }}
                            />
                          </div>
                          <p className="text-[11px] text-gray-400">
                            {completed} ta dars tamomlandi (jami {total} ta)
                          </p>
                        </div>

                        {/* Continue Learning CTA */}
                        <Link
                          to={`/learn/${course.id}`}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm shadow-purple-200"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>Darsni davom ettirish</span>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Certificates */}
        {activeTab === 'certificates' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm max-w-2xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Award className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                    Muvaffaqiyatli topshirildi
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-1">
                    Python & AI Agentlar - Professional Dasturchi Sertifikati
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    SkillUp Xalqaro IT Akademiyasi tomonidan berilgan • ID: SKILLUP-2026-99812
                  </p>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => alert("Sertifikat yuklanmoqda (PDF formatda)...")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-xl transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Yuklab olish (PDF)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm max-w-xl">
            <h3 className="text-lg font-black text-gray-900 mb-4">Profil ma'lumotlarini tahrirlash</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Ism va Familiya
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Mutaxassislik / Kasb
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="masalan, Frontend Dasturchi"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Email manzili
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-400 bg-gray-50 outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-md shadow-purple-200"
              >
                O'zgarishlarni saqlash
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
