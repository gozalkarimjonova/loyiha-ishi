import { useToastStore } from '../store/useToastStore'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        const isSuccess = t.type === 'success'
        const isError = t.type === 'error'
        const isInfo = t.type === 'info'

        return (
          <div
            key={t.id}
            className={`pointer-events-auto transform transition-all duration-300 ease-out flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md ${
              isSuccess
                ? 'bg-white/95 text-gray-900 border-emerald-500/30 shadow-emerald-500/10'
                : isError
                ? 'bg-white/95 text-gray-900 border-rose-500/30 shadow-rose-500/10'
                : 'bg-white/95 text-gray-900 border-purple-500/30 shadow-purple-500/10'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
              {isInfo && <Info className="w-5 h-5 text-purple-600" />}
            </div>

            <div className="flex-1 min-w-0">
              {t.title && (
                <p className="text-xs font-bold text-gray-900 tracking-wide uppercase">
                  {t.title}
                </p>
              )}
              <p className="text-sm font-medium text-gray-700 leading-snug">
                {t.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-lg"
              aria-label="Yopish"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
