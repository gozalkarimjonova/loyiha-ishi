import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { toast } from '../store/useToastStore'
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react'

export default function CartDrawer({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, getTotalPrice, getOldTotalPrice, clearCart } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)

  if (!isOpen) return null

  const subtotal = getTotalPrice()
  const oldSubtotal = getOldTotalPrice()
  const promoDiscount = discountApplied ? Math.min(subtotal * 0.2, 20) : 0
  const finalTotal = Math.max(0, subtotal - promoDiscount)

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === 'ILM2026') {
      setDiscountApplied(true)
      toast.success("ILM2026 promokodi faollashdi! 20% qo'shimcha chegirma berildi.", "Chegirma!")
    } else {
      toast.error("Yaroqsiz promokod. 'ILM2026' kodini sinab ko'ring", "Promokod xato")
    }
  }

  const handleCheckoutClick = () => {
    onClose()
    navigate('/checkout')
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
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Sizning savatingiz</h2>
              <p className="text-xs text-gray-500">{cartItems.length} ta kurs tanlangan</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={() => clearCart()}
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

        {/* Drawer Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-24 px-4">
              <div className="w-20 h-20 rounded-full bg-purple-50 text-purple-400 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 opacity-70" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Savatingiz hozircha bo'sh</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                Katalogdan o'zingizga qiziq kurslarni tanlab savatga qo'shing.
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
            cartItems.map((course) => (
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
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-gray-900">${course.price}</span>
                      {course.oldPrice && (
                        <span className="text-[10px] text-gray-400 line-through">
                          ${course.oldPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(course.id)}
                      className="text-gray-400 hover:text-rose-500 p-1 transition-colors"
                      title="Olib tashlash"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/70 space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promokod (masalan, ILM2026)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-purple-600 uppercase"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Qo'llash
              </button>
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Dastlabki narx:</span>
                <span className="line-through text-gray-400">${oldSubtotal.toFixed(2)}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Promokod chegirmasi (20%):
                  </span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-200">
                <span>To'lanadigan summa:</span>
                <span className="text-purple-600 text-lg">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-200 transition-all text-sm hover:-translate-y-0.5"
            >
              <span>Xarid qilishga o'tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-gray-400">
              🔒 30 kunlik kafolatlangan to'lov xavfsizligi
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
