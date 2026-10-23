import { Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useWishlistStore } from '../store/useWishlistStore'
import { useCoursesStore } from '../store/useCoursesStore'
import { Star, Heart, ShoppingBag, Clock, BookOpen, Check, Eye } from 'lucide-react'

function StarRating({ rating }) {
  const full = Math.floor(rating)
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= full
              ? 'fill-amber-400 text-amber-400'
              : rating >= i - 0.5
              ? 'fill-amber-200 text-amber-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

export default function CourseCard({ course }) {
  const { addToCart, removeFromCart, isInCart } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { setSelectedCourseForModal } = useCoursesStore()

  const inCart = isInCart(course.id)
  const inWish = isInWishlist(course.id)

  const handleCartToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCart) {
      removeFromCart(course.id)
    } else {
      addToCart(course)
    }
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(course)
  }

  const handleQuickPreview = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedCourseForModal(course)
  }

  const discountPercent = course.oldPrice
    ? Math.round((1 - course.price / course.oldPrice) * 100)
    : 0

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-200/80 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Thumbnail Section */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <Link to={`/course/${course.id}`} className="block w-full h-full">
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {course.badge && (
            <span className="bg-amber-400 text-gray-900 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
              {course.badge}
            </span>
          )}
          {course.level && (
            <span className="bg-white/90 backdrop-blur text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
              {course.level}
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={handleQuickPreview}
          title="Tezkor ko'rish"
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-white/95 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 hover:bg-purple-600 hover:text-white"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Tezkor ko'rish</span>
        </button>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label="Sevimlilarga saqlash"
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
            inWish
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
              : 'bg-white/90 backdrop-blur text-gray-500 hover:text-rose-500 hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWish ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Course Title */}
        <Link to={`/course/${course.id}`} className="block">
          <h3 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2 mb-1.5 group-hover:text-purple-600 transition-colors">
            {course.title}
          </h3>
        </Link>

        {/* Author */}
        <p className="text-xs text-gray-500 mb-2 truncate">
          {course.author}
        </p>

        {/* Metrics: Hours & Lectures */}
        <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-2.5">
          {course.hours && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-purple-500" />
              {course.hours} soat
            </span>
          )}
          {course.lectures && (
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-indigo-500" />
              {course.lectures} dars
            </span>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-xs font-bold text-amber-600">{course.rating}</span>
          <StarRating rating={course.rating} />
          <span className="text-[11px] text-gray-400">
            ({course.reviews?.toLocaleString()})
          </span>
        </div>

        {/* Price & Discount */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-gray-900">
              ${course.price}
            </span>
            {course.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${course.oldPrice}
              </span>
            )}
          </div>
          {discountPercent > 0 && (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {discountPercent}% chegirma
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleCartToggle}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
            inCart
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-200'
          }`}
        >
          {inCart ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Savatda bor</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Savatga qo'shish</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
