import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loginAsDemo, isAuthenticated } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Redirect path: where the user came from (protected route) or /dashboard
  const from = location.state?.from?.pathname || '/dashboard'

  // If already authenticated, redirect
  if (isAuthenticated) {
    navigate(from, { replace: true })
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      const success = login(email, password)
      setIsLoading(false)
      if (success) {
        navigate(from, { replace: true })
      }
    }, 400)
  }

  const handleDemoLogin = () => {
    loginAsDemo()
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-slate-50 via-purple-50/30 to-white py-12 px-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
          {/* Subtle top gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-400" />

          {/* Logo & Heading */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-200">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-black text-2xl text-gray-900 tracking-tight">
                Edu<span className="text-purple-600">Pro</span>
              </span>
            </Link>
            <h2 className="text-xl font-black text-gray-900">Tizimga kirish</h2>
            <p className="text-xs text-gray-500 mt-1">
              O'rganishni davom ettirish uchun akkauntingizga kiring
            </p>
          </div>

          {/* 1-Click Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-200 text-purple-800 p-3 rounded-2xl flex items-center justify-between transition-all group shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-tight">Bir klikda Demo kirish</p>
                <p className="text-[10px] text-purple-600">Parol va pochtasiz sinab ko'ring</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Yoki email bilan
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Elektron pochta (Email)
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5" />
                <input
                  type="email"
                  required
                  placeholder="masalan, talaba@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700">Parol</label>
                <a href="#" className="text-[11px] font-semibold text-purple-600 hover:underline">
                  Parolni unutdingizmi?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-purple-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Tizimga kirish</span>
              )}
            </button>
          </form>

          {/* Bottom Switch */}
          <p className="text-center text-xs text-gray-600 mt-6">
            Hisobingiz yo'qmi?{' '}
            <Link to="/register" className="font-bold text-purple-600 hover:underline">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
