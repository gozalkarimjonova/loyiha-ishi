import { useWishlistStore } from '../store/useWishlistStore'
import { useCartStore } from '../store/useCartStore'
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'

export default function WishlistDrawer({ isOpen, onClose }) {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore()
  const { addToCart, isInCart } = useCartStore()

  if (!isOpen) return null

  const handleMoveToCart = (course) => {
    addToCart(course)
    removeFromWishlist(course.id)
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Sevimlilar</h2>
              <p className="text-xs text-gray-500">{wishlist.length} ta saqlangan kurs</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {wishlist.length > 0 && (
              <button
                onClick={() => clearWishlist()}
                className="text-xs text-rose-500 hover:text-rose-700 hover:underline px-2 py-1"
              >
                Tozalash
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-24 px-4">
              <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-300 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 opacity-70" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Sevimlilar bo'sh</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                Sizga yoqqan kurslarni yurakcha belgisini bosib saqlab qo'yishingiz mumkin.
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                <span>Kurslarni ko'rish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            wishlist.map((course) => {
              const inCart = isInCart(course.id)
              return (
                <div
                  key={course.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-gray-100 hover:border-purple-200 bg-white transition-all shadow-sm group"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-20 h-16 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-purple-600 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">{course.author}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-sm font-black text-gray-900">${course.price}</span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleMoveToCart(course)}
                          className={`text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors ${
                            inCart
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>{inCart ? 'Savatda' : "Savatga o'tkazish"}</span>
                        </button>

                        <button
                          onClick={() => removeFromWishlist(course.id)}
                          className="text-gray-400 hover:text-rose-500 p-1 transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
