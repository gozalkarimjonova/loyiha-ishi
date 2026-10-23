import { useSelector, useDispatch } from 'react-redux'
import { toggleWishlist, addToCart } from '../store/coursesSlice'
import { FaTimes, FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa'

export default function WishlistModal({ onClose }) {
  const dispatch = useDispatch()
  const wishlist = useSelector(s => s.courses.wishlist)
  const cartItems = useSelector(s => s.courses.cartItems)

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FaHeart className="text-red-500" />
            Sevimlilar ({wishlist.length})
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <FaHeart className="text-5xl mx-auto mb-3 opacity-30" />
              <p>Sevimlilar ro'yxati bo'sh</p>
            </div>
          ) : (
            wishlist.map(course => {
              const inCart = cartItems.some(c => c.id === course.id)
              return (
                <div key={course.id} className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <img src={course.image} alt={course.title} className="w-20 h-14 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2">{course.title}</p>
                    <p className="text-xs text-gray-500 mb-1">{course.author}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-purple-700">${course.price}</span>
                      <button
                        onClick={() => !inCart && dispatch(addToCart(course))}
                        className={`text-xs px-2 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                          inCart
                            ? 'bg-green-100 text-green-700'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                      >
                        <FaShoppingCart className="text-[10px]" />
                        {inCart ? 'Savatda' : 'Qo\'sh'}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(toggleWishlist(course))}
                    className="text-red-400 hover:text-red-600 transition-colors self-start"
                  >
                    <FaTrash />
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
