import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCoursesStore } from '../store/useCoursesStore'
import { useAuthStore } from '../store/useAuthStore'
import { toast } from '../store/useToastStore'
import confetti from 'canvas-confetti'
import {
  Play,
  Pause,
  CheckCircle2,
  Circle,
  ArrowLeft,
  BookOpen,
  Award,
  Sparkles,
  Volume2,
  Maximize2,
  FileText,
  Clock,
} from 'lucide-react'

export default function LearnPage() {
  const { courseId } = useParams()
  const { getCourseById, fetchCourses } = useCoursesStore()
  const { user, toggleLessonCompleted } = useAuthStore()

  const [isPlaying, setIsPlaying] = useState(false)
  const [activeLessonIdx, setActiveLessonIdx] = useState(0)
  const [userNote, setUserNote] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const course = getCourseById(courseId)
  const completedLessons = user?.completedLessons?.[courseId] || []

  const lessons = [
    { id: 1, title: 'Kursga kirish va dasturlash asoslari', duration: '12:40' },
    { id: 2, title: 'Ishchi muhitni o\'rnatish (VS Code va sozlamalar)', duration: '18:15' },
    { id: 3, title: 'Asosiy tushunchalar va o\'zgaruvchilar', duration: '22:05' },
    { id: 4, title: 'Shartli operatorlar va sikllar (If/Else, Loops)', duration: '25:30' },
    { id: 5, title: 'Funksiyalar va modulli arxitektura', duration: '30:10' },
    { id: 6, title: 'Xatoliklar bilan ishlash va Exception Handling', duration: '16:45' },
    { id: 7, title: 'REST API bilan integratsiya qilish', duration: '35:20' },
    { id: 8, title: 'Birinchi real mini-loyihani yaratish', duration: '45:00' },
  ]

  const currentLesson = lessons[activeLessonIdx] || lessons[0]
  const isCompleted = completedLessons.includes(currentLesson.id)

  const handleToggleLesson = (id) => {
    toggleLessonCompleted(courseId, id)
    if (!completedLessons.includes(id)) {
      toast.success("Dars muvaffaqiyatli yakunlandi! +10 XP", "Ajoyib natija!")
      // If completed all lessons
      if (completedLessons.length + 1 >= lessons.length) {
        confetti({ particleCount: 100, spread: 70 })
        toast.success("Tabriklaymiz! Kursni 100% tamomladingiz!", "Sertifikat tayyor!")
      }
    }
  }

  const progressPercent = Math.round((completedLessons.length / lessons.length) * 100)

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Header */}
      <div className="bg-slate-900 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboardga qaytish</span>
          </Link>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <h2 className="text-xs sm:text-sm font-bold line-clamp-1 max-w-md text-gray-200">
            {course?.title || 'Darslik xonasi'}
          </h2>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-gray-400">Kurs jarayoni:</div>
            <div className="text-xs font-bold text-amber-400">{progressPercent}% yakunlandi</div>
          </div>
          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-amber-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Learning Room Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left: Video Player Area */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950 border-r border-white/10">
          {/* Mock Video Container */}
          <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
            {/* Background poster */}
            <img
              src={course?.image || 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800'}
              alt="Video Poster"
              className="w-full h-full object-cover opacity-30"
            />

            {/* Play Button Center */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 z-10"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1 fill-white" />}
            </button>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Volume2 className="w-4 h-4" />
                  <span>12:45 / {currentLesson.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono">1.0x</span>
                <Maximize2 className="w-4 h-4 cursor-pointer hover:text-purple-400" />
              </div>
            </div>
          </div>

          {/* Lesson Details & Notes */}
          <div className="p-6 space-y-6 overflow-y-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                  {activeLessonIdx + 1}-dars
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{currentLesson.title}</h3>
              </div>

              <button
                onClick={() => handleToggleLesson(currentLesson.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10'
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Dars yakunlandi ✓</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>Darsni yakunlash</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Personal Notes */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                <FileText className="w-4 h-4" />
                <span>Ushbu dars uchun shaxsiy qaydlarim:</span>
              </div>
              <textarea
                rows={3}
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="Darsdan olgan asosiy bilimlaringiz yoki kod qismlarini bu yerga yozib boring..."
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-gray-200 outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Right: Curriculum Sidebar */}
        <div className="lg:col-span-4 bg-slate-900 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Darslar ro'yxati ({lessons.length})</span>
            </h4>
            <span className="text-xs text-amber-400 font-bold">
              {completedLessons.length} / {lessons.length}
            </span>
          </div>

          <div className="space-y-1.5">
            {lessons.map((lesson, idx) => {
              const active = idx === activeLessonIdx
              const done = completedLessons.includes(lesson.id)

              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonIdx(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                    active
                      ? 'bg-purple-600/30 border-purple-500/50 text-white'
                      : 'bg-white/5 hover:bg-white/10 border-transparent text-gray-300'
                  }`}
                >
                  <div className="mt-0.5">
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold line-clamp-2 leading-snug">
                      {idx + 1}. {lesson.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
