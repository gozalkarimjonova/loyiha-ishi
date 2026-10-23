import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from './useToastStore'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // Login action
      login: (email, password) => {
        // Validate inputs
        if (!email || !password) {
          toast.error("Iltimos, elektron pochta va parolni kiriting", "Kirish xatosi")
          return false
        }

        // Demo login or custom credentials
        const mockUser = {
          id: 'user_101',
          name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
          email: email,
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          title: 'Dasturchi & O\'quvchi',
          enrolledCourses: [1, 2], // Already enrolled in courses 1 and 2
          completedLessons: { 1: [1, 2], 2: [1] },
          joinedDate: 'Yanvar 2025',
        }

        const mockToken = 'jwt_' + Math.random().toString(36).substring(2) + Date.now()

        set({
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
        })

        toast.success(`Xush kelibsiz, ${mockUser.name}!`, "Muvaffaqiyatli kirish")
        return true
      },

      // Instant demo login for quick testing
      loginAsDemo: (role = 'student') => {
        const demoUser = {
          id: 'demo_user_777',
          name: 'Azizbek Rahimov',
          email: 'azizbek.dev@gmail.com',
          role: role,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          title: 'Full-Stack Developer Talabasi',
          enrolledCourses: [1, 2, 6],
          completedLessons: { 1: [1, 2, 3], 2: [1, 2], 6: [1] },
          joinedDate: 'Fevral 2025',
        }

        set({
          user: demoUser,
          token: 'jwt_demo_token_authenticated_2026',
          isAuthenticated: true,
        })

        toast.success("Demo talaba sifatida tizimga kirdingiz!", "Xush kelibsiz")
        return true
      },

      // Register action
      register: ({ name, email, password }) => {
        if (!name || !email || !password) {
          toast.error("Barcha maydonlarni to'ldirish shart!", "Xatolik")
          return false
        }

        const newUser = {
          id: 'user_' + Date.now(),
          name,
          email,
          role: 'student',
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
          title: 'Yangi O\'quvchi',
          enrolledCourses: [],
          completedLessons: {},
          joinedDate: 'Bugun',
        }

        const token = 'jwt_' + Math.random().toString(36).substring(2)

        set({
          user: newUser,
          token,
          isAuthenticated: true,
        })

        toast.success("Hisobingiz muvaffaqiyatli yaratildi!", "Tabriklaymiz!")
        return true
      },

      // Logout
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        toast.info("Tizimdan muvaffaqiyatli chiqdingiz", "Xayr!")
      },

      // Update profile
      updateProfile: (updatedData) => {
        const currentUser = get().user
        if (!currentUser) return

        set({
          user: {
            ...currentUser,
            ...updatedData,
          },
        })
        toast.success("Profil ma'lumotlari yangilandi", "Saqlandi")
      },

      // Enroll in courses after checkout
      enrollCourses: (courseIds) => {
        const currentUser = get().user
        if (!currentUser) return

        const currentEnrolled = currentUser.enrolledCourses || []
        const uniqueEnrolled = Array.from(new Set([...currentEnrolled, ...courseIds]))

        set({
          user: {
            ...currentUser,
            enrolledCourses: uniqueEnrolled,
          },
        })
      },

      // Toggle completed lesson
      toggleLessonCompleted: (courseId, lessonId) => {
        const currentUser = get().user
        if (!currentUser) return

        const currentCompleted = currentUser.completedLessons || {}
        const courseLessons = currentCompleted[courseId] || []

        let newLessons
        if (courseLessons.includes(lessonId)) {
          newLessons = courseLessons.filter(id => id !== lessonId)
        } else {
          newLessons = [...courseLessons, lessonId]
        }

        set({
          user: {
            ...currentUser,
            completedLessons: {
              ...currentCompleted,
              [courseId]: newLessons,
            },
          },
        })
      },
    }),
    {
      name: 'loyha-auth-storage', // key in localStorage
    }
  )
)
