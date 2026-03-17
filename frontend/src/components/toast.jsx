import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { cn } from './ui.jsx'

const ToastContext = createContext(null)

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function toastStyles(variant) {
  switch (variant) {
    case 'success':
      return 'border-emerald-500/25 bg-emerald-500/10 text-emerald-50 ring-emerald-400/20'
    case 'error':
      return 'border-rose-500/25 bg-rose-500/10 text-rose-50 ring-rose-400/20'
    case 'info':
    default:
      return 'border-sky-500/25 bg-sky-500/10 text-sky-50 ring-sky-400/20'
  }
}

function ToastViewport({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed left-1/2 top-4 z-[60] flex w-[min(92vw,420px)] -translate-x-1/2 flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'pointer-events-auto overflow-hidden rounded-2xl border p-3 shadow-2xl ring-1 backdrop-blur-md',
            'animate-[toastIn_180ms_ease-out]',
            toastStyles(t.variant)
          )}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-5">{t.title}</div>
              {t.message ? (
                <div className="mt-0.5 text-sm/5 text-white/80">{t.message}</div>
              ) : null}
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timeoutsRef = useRef(new Map())

  const dismiss = useCallback((id) => {
    const t = timeoutsRef.current.get(id)
    if (t) clearTimeout(t)
    timeoutsRef.current.delete(id)
    setToasts((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const push = useCallback(
    ({ title, message, variant = 'info', durationMs = 2600 }) => {
      const id = createId()
      setToasts((prev) => [{ id, title, message, variant }, ...prev].slice(0, 4))
      const timeout = setTimeout(() => dismiss(id), durationMs)
      timeoutsRef.current.set(id, timeout)
      return id
    },
    [dismiss]
  )

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
      <style>{`
        @keyframes toastIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

