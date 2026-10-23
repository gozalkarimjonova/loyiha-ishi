import { Link } from 'react-router-dom'
import { useCoursesStore } from '../store/useCoursesStore'
import { useCartStore } from '../store/useCartStore'
import { useWishlistStore } from '../store/useWishlistStore'
import { X, Star, Clock, BookOpen, Check, ShoppingBag, Heart, ArrowRight } from 'lucide-react'

export default function CourseQuickViewModal() {
  const { selectedCourseForModal, setSelectedCourseForModal } = useCoursesStore()
  const { addToCart, removeFromCart, isInCart } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()

  if (!selectedCourseForModal) return null

  const course = selectedCourseForModal
  const inCart = isInCart(course.id)
  const inWish = isInWishlist(course.id)

  const handleClose = () => setSelectedCourseForModal(null)

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image & close */}
        <div className="relative h-48 sm:h-56 bg-slate-900">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            {course.badge && (
              <span className="bg-amber-400 text-gray-950 text-xs font-black px-2.5 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                {course.badge}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{course.rating}</span>
              <span className="text-gray-400 font-normal">({course.reviews?.toLocaleString()} sharh)</span>
            </div>
            {course.hours && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>{course.hours} soat umumiy video</span>
              </div>
            )}
            {course.lectures && (
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>{course.lectures} ta amaliy dars</span>
              </div>
            )}
            <div className="text-gray-500">
              Muallif: <span className="font-semibold text-gray-800">{course.author}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1.5">Kurs haqida qisqacha:</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {course.description || "Ushbu kurs sizga sohaning eng zamonaviy texnologiyalari va amaliy ko'nikmalarini real loyihalar orqali o'rgatadi."}
            </p>
          </div>

          {/* Skills */}
          {course.skills && course.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-2">O'rganiladigan texnologiyalar:</h4>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-50 text-purple-700 border border-purple-100 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-purple-600" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price and Action Section */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900">${course.price}</span>
              {course.oldPrice && (
                <span className="text-sm text-gray-400 line-through">${course.oldPrice}</span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => toggleWishlist(course)}
                className={`p-3 rounded-xl border transition-colors ${
                  inWish
                    ? 'border-rose-300 bg-rose-50 text-rose-500'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
                title="Sevimlilarga"
              >
                <Heart className={`w-5 h-5 ${inWish ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={() => inCart ? removeFromCart(course.id) : addToCart(course)}
                className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                  inCart
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {inCart ? 'Savatda bor' : "Savatga qo'shish"}
              </button>

              <Link
                to={`/course/${course.id}`}
                onClick={handleClose}
                className="px-5 py-3 rounded-xl text-sm font-bold bg-gray-900 hover:bg-black text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Batafsil</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
