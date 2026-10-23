import { create } from 'zustand'

export const useCoursesStore = create((set, get) => ({
  sections: [],
  categories: [],
  topics: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  searchQuery: '',
  activeCategory: 'All',
  sortBy: 'popular', // 'popular' | 'rating' | 'price-low' | 'price-high' | 'newest'
  selectedCourseForModal: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSelectedCourseForModal: (course) => set({ selectedCourseForModal: course }),

  fetchCourses: async () => {
    // If already loaded, no need to reload unless forced
    if (get().status === 'succeeded' && get().sections.length > 0) return

    set({ status: 'loading', error: null })
    try {
      const res = await fetch('/data.json')
      if (!res.ok) throw new Error('Data yuklanmadi')
      const data = await res.json()

      // Normalize categories: always ensure 'All' is present first
      const rawCategories = data.categories || []
      const categories = rawCategories.includes('All') ? rawCategories : ['All', ...rawCategories]

      set({
        sections: data.sections || [],
        categories: categories,
        topics: data.topics || [],
        status: 'succeeded',
      })
    } catch (err) {
      console.error('Fetch courses error:', err)
      set({ status: 'failed', error: err.message })
    }
  },

  // Helper getters
  getAllCourses: () => {
    const { sections } = get()
    return sections.flatMap((s) => s.courses || [])
  },

  getCourseById: (id) => {
    const all = get().getAllCourses()
    return all.find((c) => String(c.id) === String(id)) || null
  },
}))
