import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from './useToastStore'

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (course) => {
        const { cartItems } = get()
        const exists = cartItems.some((item) => item.id === course.id)

        if (exists) {
          toast.info(`"${course.title.slice(0, 30)}..." allaqachon savatda bor`, "Savat")
          return
        }

        set({ cartItems: [...cartItems, course] })
        toast.success(`"${course.title.slice(0, 30)}..." savatga qo'shildi!`, "Savatga qo'shildi")
      },

      removeFromCart: (courseId) => {
        const { cartItems } = get()
        const item = cartItems.find((c) => c.id === courseId)
        set({ cartItems: cartItems.filter((c) => c.id !== courseId) })
        if (item) {
          toast.info(`"${item.title.slice(0, 25)}..." savatdan olib tashlandi`)
        }
      },

      clearCart: () => {
        set({ cartItems: [] })
      },

      isInCart: (courseId) => {
        return get().cartItems.some((item) => item.id === courseId)
      },

      getTotalPrice: () => {
        return get().cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0)
      },

      getOldTotalPrice: () => {
        return get().cartItems.reduce((acc, item) => acc + (Number(item.oldPrice) || Number(item.price) * 1.5), 0)
      },

      getTotalSavings: () => {
        const total = get().getTotalPrice()
        const oldTotal = get().getOldTotalPrice()
        return Math.max(0, oldTotal - total)
      },
    }),
    {
      name: 'loyha-cart-storage',
    }
  )
)
