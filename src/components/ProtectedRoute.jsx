import { useEffect } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { toast } from '../store/useToastStore'
import { ShieldAlert } from 'lucide-react'

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info(
        "Ushbu bo'lim faqat ro'yxatdan o'tgan foydalanuvchilar uchun ochiq. Iltimos, tizimga kiring.",
        "Himoyalangan sahifa (Protected Route)"
      )
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    // Redirect to login page and save the intended location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If a specific role is required and user does not have it
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 max-w-md text-center">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ruxsat cheklangan</h2>
          <p className="text-sm text-gray-600 mb-6">
            Ushbu bo'limga kirish uchun sizda yetarli huquq mavjud emas ({requiredRole} roli talab qilinadi).
          </p>
          <a
            href="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm shadow-md shadow-purple-200"
          >
            Bosh sahifaga qaytish
          </a>
        </div>
      </div>
    )
  }

  return children ? children : <Outlet />
}
