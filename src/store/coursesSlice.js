import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const res = await fetch('/data.json')
  return await res.json()
})

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    sections: [],
    categories: [],
    topics: [],
    status: 'idle',
    searchQuery: '',
    cartItems: [],
    wishlist: [],
    activeCategory: 'Hammasi',
  },
  reducers: {
    setSearchQuery: (s, a) => { s.searchQuery = a.payload },
    addToCart: (s, a) => {
      if (!s.cartItems.find(c => c.id === a.payload.id)) s.cartItems.push(a.payload)
    },
    removeFromCart: (s, a) => {
      s.cartItems = s.cartItems.filter(c => c.id !== a.payload)
    },
    toggleWishlist: (s, a) => {
      const idx = s.wishlist.findIndex(c => c.id === a.payload.id)
      idx >= 0 ? s.wishlist.splice(idx, 1) : s.wishlist.push(a.payload)
    },
    setActiveCategory: (s, a) => { s.activeCategory = a.payload },
  },
  extraReducers: b => {
    b.addCase(fetchCourses.pending, s => { s.status = 'loading' })
     .addCase(fetchCourses.fulfilled, (s, a) => {
       s.status = 'succeeded'
       s.sections = a.payload.sections
       s.categories = a.payload.categories || []
       s.topics = a.payload.topics || []
     })
     .addCase(fetchCourses.rejected, s => { s.status = 'failed' })
  }
})

export const { setSearchQuery, addToCart, removeFromCart, toggleWishlist, setActiveCategory } = coursesSlice.actions
export default coursesSlice.reducer
