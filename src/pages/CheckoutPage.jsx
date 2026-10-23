import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useAuthStore } from '../store/useAuthStore'
import { toast } from '../store/useToastStore'
import confetti from 'canvas-confetti'
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  ArrowLeft,
} from 'lucide-react'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, getTotalPrice, getOldTotalPrice, clearCart } = useCartStore()
  const { user, enrollCourses } = useAuthStore()

  const [paymentMethod, setPaymentMethod] = useState('payme')
  const [promoCode, setPromoCode] = useState('ILM2026')
  const [promoApplied, setPromoApplied] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const subtotal = getTotalPrice()
  const oldSubtotal = getOldTotalPrice()
  const promoDiscount = promoApplied ? Math.min(subtotal * 0.2, 25) : 0
  const finalTotal = Math.max(0, subtotal - promoDiscount)

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === 'ILM2026') {
      setPromoApplied(true)
      toast.success("ILM2026 promokodi muvaffaqiyatli qo'llandi! (-20%)", "Chegirma")
    } else {
      toast.error("Yaroqsiz promokod. 'ILM2026' kodidan foydalaning.")
    }
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    if (cartItems.length === 0) {
      toast.error("Savatingiz bo'sh!", "Xatolik")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Confetti celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      })

      // Enroll user into purchased courses
      const courseIds = cartItems.map((c) => c.id)
      enrollCourses(courseIds)

      // Clear the cart
      clearCart()

      toast.success(
        "To'lov muvaffaqiyatli amalga oshirildi! Kurslar hisobingizga qo'shildi.",
        "Tabriklaymiz!"
      )
    }, 1500)
  }

  // Success State View
  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-2xl max-w-lg w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
              To'lov Tasdiqlandi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
              Xaridingiz uchun rahmat!
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              Kurslar sizning shaxsiy kabinetingizga biriktirildi. Hoziroq o'rganishni boshlashingiz mumkin.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl text-left text-xs space-y-2 border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">To'lovchi:</span>
              <span className="font-bold text-gray-800">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">To'lov usuli:</span>
              <span className="font-bold uppercase text-purple-700">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Jami to'langan:</span>
              <span className="font-black text-emerald-600">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/dashboard"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-purple-200"
            >
              <span>Kurslarimga o'tish (Dashboard)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/"
              className="px-5 py-3.5 border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold rounded-xl text-xs transition-colors"
            >
              Katalog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Savatingizda kurslar yo'q</h2>
          <p className="text-xs text-gray-500 mb-6">
            To'lovni amalga oshirish uchun avval katalogdan kurs tanlang.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-purple-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Katalogga qaytish
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-purple-600 mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Katalogga qaytish
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Xaridni rasmiylashtirish (Checkout)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Xavfsiz va kafolatlangan to'lov orqali kurslarga bir umrlik kirish huquqini qo'lga kiriting
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Payment & User Info */}
          <div className="lg:col-span-7 space-y-6">
            {/* User Billing Summary */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-gray-900">1. Foydalanuvchi ma'lumotlari</h3>
              <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-900">{user?.name}</p>
                  <p className="text-[11px] text-gray-500">{user?.email}</p>
                </div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                  Tasdiqlangan hisob ✓
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">2. To'lov tizimini tanlang</h3>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" /> 256-bit SSL himoya
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'payme', name: 'Payme', badge: '0% komissiya' },
                  { id: 'click', name: 'Click Up', badge: 'Tezkor' },
                  { id: 'uzum', name: 'Uzum Bank', badge: 'Keshbek' },
                  { id: 'card', name: 'Visa / MC', badge: 'Xalqaro' },
                ].map((method) => {
                  const isSelected = paymentMethod === method.id
                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/70 text-purple-900 ring-2 ring-purple-600/20'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      <CreditCard
                        className={`w-5 h-5 ${isSelected ? 'text-purple-600' : 'text-gray-400'}`}
                      />
                      <span className="text-xs font-bold">{method.name}</span>
                      <span className="text-[9px] text-gray-500">{method.badge}</span>
                    </button>
                  )
                })}
              </div>

              {/* Mock Card Input if Card Selected */}
              {paymentMethod === 'card' && (
                <div className="pt-2 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Karta raqami
                    </label>
                    <input
                      type="text"
                      placeholder="8600 •••• •••• ••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-purple-600 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Amal qilish muddati
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-purple-600 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={3}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-purple-600 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Items & Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-gray-900">Buyurtma tafsilotlari</h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((c) => (
                  <div key={c.id} className="flex gap-3 items-center">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-14 h-11 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 line-clamp-1">{c.title}</p>
                      <p className="text-[10px] text-gray-400">{c.author}</p>
                    </div>
                    <span className="text-xs font-black text-gray-900">${c.price}</span>
                  </div>
                ))}
              </div>

              {/* Promo code */}
              <form onSubmit={handleApplyPromo} className="flex gap-2 pt-2 border-t border-gray-100">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promokod"
                    className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-purple-600 uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-black"
                >
                  Qo'llash
                </button>
              </form>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Kurslar dastlabki narxi:</span>
                  <span className="line-through text-gray-400">${oldSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Katalog chegirmasi:</span>
                  <span>-${(oldSubtotal - subtotal).toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-purple-700 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> ILM2026 (20% chegirma):
                    </span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-200">
                  <span>Jami to'lov:</span>
                  <span className="text-purple-600 text-xl">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Payment Button */}
              <button
                type="button"
                onClick={handlePaymentSubmit}
                disabled={isProcessing}
                className="w-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-black py-4 px-4 rounded-xl text-sm transition-all shadow-md shadow-amber-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-gray-950" />
                    <span>To'lovni tasdiqlash (${finalTotal.toFixed(2)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>30 kun ichida 100% pulni qaytarib berish kafolati</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
