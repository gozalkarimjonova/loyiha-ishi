import { Link } from 'react-router-dom'
import { useCoursesStore } from '../store/useCoursesStore'
import { useAuthStore } from '../store/useAuthStore'
import {
  Sparkles,
  Rocket,
  ShieldCheck,
  Star,
  Users,
  Award,
  PlayCircle,
  Flame,
  Search,
} from 'lucide-react'

export default function HeroBanner() {
  const { setSearchQuery } = useCoursesStore()
  const { isAuthenticated, loginAsDemo } = useAuthStore()

  const popularTags = ['AI Agentlar', 'Python', 'React', 'ChatGPT', 'Spring AI', 'Go']

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white py-16 md:py-24">
      {/* Background Glow Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Chip */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold text-purple-200 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>2026-yilning eng talabgir IT kurslari</span>
              <span className="bg-amber-400 text-gray-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                YANGI
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15]">
              Kelajak kasblarini{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-indigo-300">
                amaliy bilim
              </span>{' '}
              bilan egallang
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-purple-100/90 max-w-2xl leading-relaxed">
              AI agentlar, Python, Web va Cloud texnologiyalarini noldan professional darajagacha
              top ekspertlar hamrohligida o'rganing.
            </p>

            {/* Quick Action Search Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="text-xs text-purple-300 font-medium flex items-center gap-1">
                <Search className="w-3.5 h-3.5" /> Mashhur:
              </span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="text-xs bg-white/10 hover:bg-white/20 border border-white/10 text-purple-100 px-3 py-1 rounded-full transition-colors font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-3">
              <a
                href="#courses-section"
                className="bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold px-7 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 text-sm"
              >
                <Rocket className="w-4 h-4" />
                <span>Kurslarni ko'rish</span>
              </a>

              {!isAuthenticated && (
                <button
                  onClick={() => loginAsDemo()}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-2xl backdrop-blur-md transition-all text-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Demo sinovdan o'tish</span>
                </button>
              )}
            </div>

            {/* Key Trust Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-left">
              <div>
                <div className="text-2xl font-black text-amber-300">10,000+</div>
                <div className="text-xs text-purple-200">Video darslar</div>
              </div>
              <div>
                <div className="text-2xl font-black text-amber-300">50,000+</div>
                <div className="text-xs text-purple-200">Muvaffaqiyatli talaba</div>
              </div>
              <div>
                <div className="text-2xl font-black text-amber-300">4.8 / 5.0</div>
                <div className="text-xs text-purple-200">O'rtacha baho</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Floating Cards */}
          <div className="lg:col-span-5 relative hidden sm:block">
            {/* Main Featured Card */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="relative h-52 rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600"
                  alt="Featured Course"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-amber-400 text-gray-950 text-xs font-black px-2.5 py-0.5 rounded shadow">
                  HAFTALIK TREND
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs text-amber-300 font-semibold mb-0.5">Top Kurs</div>
                  <h3 className="font-bold text-sm line-clamp-1">
                    Python, Django, Data Science va Machine Learning
                  </h3>
                </div>
              </div>

              {/* Floating Stat Pills */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Xalqaro Sertifikat</div>
                      <div className="text-[11px] text-purple-200">Bitiruvchilar uchun</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-300">Tasdiqlangan ✓</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                      <Star className="w-5 h-5 fill-amber-300" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">4.9 Baho (12,500+ fikr)</div>
                      <div className="text-[11px] text-purple-200">Yuqori sifat kafolati</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-300">Top 1%</span>
                </div>
              </div>
            </div>

            {/* Little floating badge top-left */}
            <div className="absolute -top-5 -left-5 bg-gradient-to-r from-purple-600 to-indigo-600 border border-white/20 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-bounce-slow">
              <Flame className="w-5 h-5 text-amber-300" />
              <div>
                <div className="text-[11px] font-bold">Kun taklifi</div>
                <div className="text-[10px] text-purple-200">-80% chegirma</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
