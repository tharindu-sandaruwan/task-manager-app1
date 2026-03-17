import { Button, Spinner } from './ui.jsx'

export function ConfirmDialog({ open, title, message, busy, onCancel, onConfirm }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={() => (busy ? null : onCancel())}
      />
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-2xl">
        <div className="text-lg font-semibold text-slate-100">{title}</div>
        <div className="mt-2 text-sm text-slate-300">{message}</div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={busy}>
            {busy ? <Spinner className="border-slate-900/60 border-t-transparent" /> : null}
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

