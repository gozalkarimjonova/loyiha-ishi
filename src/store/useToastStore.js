import { create } from 'zustand'

export const useToastStore = create((set, get) => ({
  toasts: [],
  addToast: (message, type = 'success', title = '') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7)
    const newToast = { id, message, type, title }
    
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }))

    // Auto remove after 3.5 seconds
    setTimeout(() => {
      get().removeToast(id)
    }, 3500)

    return id
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  },
}))

// Convenient helper functions
export const toast = {
  success: (message, title = 'Muvaffaqiyatli!') =>
    useToastStore.getState().addToast(message, 'success', title),
  error: (message, title = 'Xatolik!') =>
    useToastStore.getState().addToast(message, 'error', title),
  info: (message, title = "Ma'lumot") =>
    useToastStore.getState().addToast(message, 'info', title),
}
