import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../store/coursesSlice'
import { FaTimes, FaTrash, FaShoppingCart } from 'react-icons/fa'

export default function CartModal({ onClose }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(s => s.courses.cartItems)
  const total = cartItems.reduce((sum, c) => sum + c.price, 0)

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-slide-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FaShoppingCart className="text-purple-600" />
            Savat ({cartItems.length})
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <FaShoppingCart className="text-5xl mx-auto mb-3 opacity-30" />
              <p>Savat bo'sh</p>
            </div>
          ) : (
            cartItems.map(course => (
              <div key={course.id} className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                <img src={course.image} alt={course.title} className="w-20 h-14 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2">{course.title}</p>
                  <p className="text-xs text-gray-500">{course.author}</p>
                  <p className="text-sm font-bold text-purple-700">${course.price}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(course.id))}
                  className="text-red-400 hover:text-red-600 transition-colors self-start"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-600">Jami:</span>
              <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl font-semibold transition-colors">
              To'lovga o'tish
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
