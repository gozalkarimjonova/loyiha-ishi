import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ToastContainer from './components/ToastContainer'
import ProtectedRoute from './components/ProtectedRoute'

import HomePage from './pages/HomePage'
import CourseDetailPage from './pages/CourseDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CheckoutPage from './pages/CheckoutPage'
import LearnPage from './pages/LearnPage'
import NotFoundPage from './pages/NotFoundPage'

// Layout wrapper to conditionally show/hide Navbar and Footer on learning mode
function AppLayout() {
  const location = useLocation()
  const isLearningRoom = location.pathname.startsWith('/learn')

  return (
    <div className="flex flex-col min-h-screen text-slate-800 antialiased selection:bg-purple-600 selection:text-white">
      {/* Toast Notification Container for all pages */}
      <ToastContainer />

      {/* Navbar (hidden in focus/video room) */}
      {!isLearningRoom && <Navbar />}

      {/* Main Page Routing */}
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes (require authentication via useAuthStore) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/learn/:courseId" element={<LearnPage />} />
          </Route>

          {/* 404 Not Found Routes */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Footer (hidden in focus/video room) */}
      {!isLearningRoom && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
