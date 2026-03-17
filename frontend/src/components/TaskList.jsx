import { priorityMeta, statusMeta } from '../lib/taskMeta.jsx'
import { formatDate } from '../lib/date.jsx'
import { cn } from './ui.jsx'

export function TaskList({ tasks, loading, onOpenCreate, onOpenEdit }) {
  if (loading) {
    return (
      <div className="grid gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[92px] animate-pulse rounded-2xl border border-slate-800 bg-slate-950/60"
          />
        ))}
      </div>
    )
  }

  if (!loading && tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-center">
        <div className="text-sm font-semibold text-slate-100">No tasks found</div>
        <div className="mt-1 text-sm text-slate-400">
          Try changing filters, or create a new task.
        </div>
        <div className="mt-4">
          <button
            onClick={onOpenCreate}
            className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-3.5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            New task
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 grid gap-3">
      {tasks.map((t) => {
        const s = statusMeta(t?.status)
        const p = priorityMeta(t?.priority)
        return (
          <button
            key={t?.id}
            onClick={() => onOpenEdit(t)}
            className={cn(
              'group relative w-full rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-left',
              'transition hover:border-slate-700 hover:bg-slate-950/75'
            )}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
                      s.chip
                    )}
                  >
                    {s.label}
                  </div>
                  <div className={cn('inline-flex items-center gap-2 text-xs', p.text)}>
                    <span className={cn('h-2 w-2 rounded-full', p.dot)} />
                    {p.label}
                  </div>
                  {t?.dueDate ? (
                    <div className="text-xs text-slate-400">
                      Due{' '}
                      <span className="font-semibold text-slate-300">
                        {formatDate(t.dueDate)}
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-600">No due date</div>
                  )}
                </div>

                <div className="mt-2 truncate text-base font-semibold text-slate-50">
                  {t?.title || 'Untitled'}
                </div>

                {t?.description ? (
                  <div className="mt-1 line-clamp-2 text-sm text-slate-400">
                    {t.description}
                  </div>
                ) : (
                  <div className="mt-1 text-sm text-slate-600">No description</div>
                )}
              </div>

              <div className="shrink-0 text-right text-xs text-slate-500">
                <div className="text-slate-400">
                  Assignee:{' '}
                  <span className="font-medium text-slate-300">
                    {t?.assigneeEmail || '—'}
                  </span>
                </div>
                <div className="mt-1">
                  Completed:{' '}
                  <span className="font-medium text-slate-300">
                    {t?.completedAt ? formatDate(t.completedAt) : '—'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-sky-500/15 transition group-hover:ring-4" />
          </button>
        )
      })}
    </div>
  )
}

