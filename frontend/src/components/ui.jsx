export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

export function Field({ label, children }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-slate-300">{label}</span>
      {children}
    </label>
  )
}

export function TextInput(props) {
  return (
    <input
      {...props}
      className={cn(
        'h-10 w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3 text-sm text-slate-100 outline-none',
        'placeholder:text-slate-500',
        'focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20',
        props.className
      )}
    />
  )
}

export function Select(props) {
  return (
    <select
      {...props}
      className={cn(
        'h-10 w-full cursor-pointer rounded-xl border border-slate-800 bg-slate-900/60 px-3 text-sm text-slate-100 outline-none',
        'focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20',
        props.className
      )}
    />
  )
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      className={cn(
        'min-h-24 w-full resize-y rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none',
        'placeholder:text-slate-500',
        'focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20',
        props.className
      )}
    />
  )
}

export function Button({ variant = 'primary', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60'
  const styles =
    variant === 'primary'
      ? 'bg-sky-500 text-slate-950 hover:bg-sky-400'
      : variant === 'danger'
        ? 'bg-rose-500 text-slate-950 hover:bg-rose-400'
        : variant === 'ghost'
          ? 'bg-white/0 text-slate-100 hover:bg-white/5 ring-1 ring-inset ring-slate-800'
          : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
  return <button {...props} className={cn(base, styles, props.className)} />
}

export function Spinner({ className }) {
  return (
    <span
      className={cn(
        'inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent',
        className
      )}
      aria-label="Loading"
    />
  )
}

