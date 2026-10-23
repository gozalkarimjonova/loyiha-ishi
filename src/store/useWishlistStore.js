import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from './useToastStore'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (course) => {
        const { wishlist } = get()
        const exists = wishlist.some((item) => item.id === course.id)

        if (exists) {
          set({ wishlist: wishlist.filter((item) => item.id !== course.id) })
          toast.info(`"${course.title.slice(0, 25)}..." sevimlilardan o'chirildi`)
        } else {
          set({ wishlist: [...wishlist, course] })
          toast.success(`"${course.title.slice(0, 25)}..." sevimlilarga saqlandi!`, "Sevimlilar")
        }
      },

      isInWishlist: (courseId) => {
        return get().wishlist.some((item) => item.id === courseId)
      },

      removeFromWishlist: (courseId) => {
        set({ wishlist: get().wishlist.filter((item) => item.id !== courseId) })
      },

      clearWishlist: () => {
        set({ wishlist: [] })
      },
    }),
    {
      name: 'loyha-wishlist-storage',
    }
  )
)
