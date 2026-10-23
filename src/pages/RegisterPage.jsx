import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Sparkles,
  CheckCircle,
} from 'lucide-react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, loginAsDemo, isAuthenticated } = useAuthStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true })
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!agreeTerms) {
      alert("Iltimos, foydalanish shartlariga rozilik bildiring")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const ok = register({ name, email, password })
      setIsLoading(false)
      if (ok) {
        navigate('/dashboard', { replace: true })
      }
    }, 400)
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-slate-50 via-purple-50/30 to-white py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-400" />

          {/* Heading */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-200">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-black text-2xl text-gray-900 tracking-tight">
                Edu<span className="text-purple-600">Pro</span>
              </span>
            </Link>
            <h2 className="text-xl font-black text-gray-900">Ro'yxatdan o'tish</h2>
            <p className="text-xs text-gray-500 mt-1">
              Bepul hisob yarating va o'rganishni darhol boshlang
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Ism va familiyangiz
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5" />
                <input
                  type="text"
                  required
                  placeholder="masalan, Shaxzod Aliyev"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Elektron pochta (Email)
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5" />
                <input
                  type="email"
                  required
                  placeholder="shaxzod@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Yangi parol
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Kamida 6 ta belgi"
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

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer">
                Foydalanish shartlari va maxfiylik siyosatiga roziman
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-purple-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Ro'yxatdan o'tish</span>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-6">
            Allaqachon hisobingiz bormi?{' '}
            <Link to="/login" className="font-bold text-purple-600 hover:underline">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
