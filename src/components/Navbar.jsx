import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useCartStore } from '../store/useCartStore'
import { useWishlistStore } from '../store/useWishlistStore'
import { useCoursesStore } from '../store/useCoursesStore'
import CartDrawer from './CartDrawer'
import WishlistDrawer from './WishlistDrawer'
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  BookOpen,
  Sparkles,
  Layers,
  GraduationCap,
  ShieldCheck,
  Flame,
} from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, logout, loginAsDemo } = useAuthStore()
  const { cartItems } = useCartStore()
  const { wishlist } = useWishlistStore()
  const {
    searchQuery,
    setSearchQuery,
    categories,
    setActiveCategory,
    getAllCourses,
  } = useCoursesStore()

  const [showCart, setShowCart] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCategoryMenu, setShowCategoryMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [promoBarVisible, setPromoBarVisible] = useState(true)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const searchRef = useRef(null)
  const userMenuRef = useRef(null)
  const categoryMenuRef = useRef(null)

  // Live search instant matching
  const allCourses = getAllCourses()
  const liveMatches = searchQuery.trim()
    ? allCourses
        .filter(
          (c) =>
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.author.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : []

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false)
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target)) {
        setShowCategoryMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat)
    setShowCategoryMenu(false)
    setMobileMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setIsSearchFocused(false)
    if (location.pathname !== '/') {
      navigate('/')
    }
  }

  return (
    <>
      {/* Top Announcement Bar */}
      {promoBarVisible && (
        <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 text-white text-xs font-semibold py-2 px-4 shadow-sm relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 mx-auto">
              <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">
                Aksiya
              </span>
              <span className="text-yellow-200 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> 80% gacha chegirma!
              </span>
              <span className="hidden sm:inline text-purple-100">
                Promokod: <strong className="underline text-white font-mono tracking-wider">ILM2026</strong>
              </span>
            </div>
            <button
              onClick={() => setPromoBarVisible(false)}
              className="text-white/70 hover:text-white p-0.5 rounded hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3 md:gap-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-200 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-gray-900 leading-none">
                Skill<span className="text-purple-600">Up</span>
              </span>
              <span className="text-[10px] font-semibold text-gray-400 tracking-wider">
                ONLINE AKADEMIYA
              </span>
            </div>
          </Link>

          {/* Categories Mega Dropdown */}
          <div className="relative hidden lg:block" ref={categoryMenuRef}>
            <button
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
            >
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Kategoriyalar</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  showCategoryMenu ? 'rotate-180 text-purple-600' : 'text-gray-400'
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showCategoryMenu && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Yo'nalishni tanlang
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 font-medium flex items-center justify-between transition-colors"
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      kurslar
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar with Live Preview */}
          <div className="flex-1 max-w-xl relative hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center bg-gray-100/80 hover:bg-gray-100 focus-within:bg-white border border-transparent focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 rounded-full transition-all">
                <Search className="w-4 h-4 text-gray-400 ml-4 shrink-0" />
                <input
                  type="text"
                  placeholder="Xohlagan mavzu yoki o'qituvchini qidiring..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full py-2.5 pl-3 pr-4 text-sm text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mr-3 text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>

            {/* Live Search Instant Preview Dropdown */}
            {isSearchFocused && liveMatches.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Tezkor natijalar ({liveMatches.length})
                </div>
                {liveMatches.map((course) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    onClick={() => setIsSearchFocused(false)}
                    className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-xl transition-colors group"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-12 h-9 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-purple-600">
                        {course.title}
                      </p>
                      <p className="text-[11px] text-gray-500">{course.author}</p>
                    </div>
                    <span className="text-xs font-black text-gray-900 shrink-0">
                      ${course.price}
                    </span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsSearchFocused(false)
                    if (location.pathname !== '/') navigate('/')
                  }}
                  className="w-full mt-1.5 py-2 text-center text-xs font-bold text-purple-600 hover:bg-purple-50 rounded-xl"
                >
                  Barcha natijalarni ko'rish →
                </button>
              </div>
            )}
          </div>

          {/* Right Navigation & Actions */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Wishlist Button */}
            <button
              onClick={() => setShowWishlist(true)}
              aria-label="Sevimlilar"
              className="relative p-2.5 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              title="Sevimlilar"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              aria-label="Savat"
              className="relative p-2.5 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              title="Savat"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Auth State */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={user?.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-500/20"
                  />
                  <span className="text-xs font-bold text-gray-800 hidden sm:inline max-w-[100px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900">{user?.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                      <div className="mt-1.5 inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                        <ShieldCheck className="w-3 h-3 text-purple-600" />
                        <span>Talaba Profili</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-purple-600" />
                        <span>Mening kurslarim (Dashboard)</span>
                      </Link>

                      <Link
                        to="/checkout"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4 text-indigo-600" />
                        <span>Checkout / To'lov</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-gray-100">
                      <button
                        onClick={() => {
                          logout()
                          setShowUserMenu(false)
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Tizimdan chiqish</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center text-xs font-bold text-gray-800 hover:text-purple-600 px-3 py-2 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all"
                >
                  Kirish
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex items-center text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 px-3.5 py-2 rounded-xl shadow-sm transition-all"
                >
                  Ro'yxatdan o'tish
                </Link>
                <button
                  onClick={() => loginAsDemo()}
                  className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-100/70 hover:bg-purple-100 px-3 py-2 rounded-xl border border-purple-200 transition-colors"
                  title="Bir klikda sinov akkaunti bilan kiring"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Demo kirish</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-4 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Kurslarni qidiring..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm bg-transparent outline-none"
                />
              </div>
            </form>

            <div className="space-y-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Kategoriyalar
              </p>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-purple-600 hover:text-white font-medium transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {!isAuthenticated ? (
              <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-bold border border-gray-200 rounded-xl"
                >
                  Kirish
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-bold bg-purple-600 text-white rounded-xl"
                >
                  Ro'yxatdan o'tish
                </Link>
                <button
                  onClick={() => {
                    loginAsDemo()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-purple-700 bg-purple-50 rounded-xl"
                >
                  ⚡ Bir klikda Demo sifatida kirish
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-bold text-purple-700 p-2 rounded-lg bg-purple-50"
                >
                  <BookOpen className="w-4 h-4" /> Mening kurslarim (Dashboard)
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-rose-600 p-2"
                >
                  <LogOut className="w-4 h-4" /> Tizimdan chiqish
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Slide-over Drawers */}
      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
      <WishlistDrawer isOpen={showWishlist} onClose={() => setShowWishlist(false)} />
    </>
  )
}
