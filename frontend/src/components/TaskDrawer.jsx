import { useEffect, useState } from 'react'
import { Priority, Status } from '../lib/tasksApi.jsx'
import { Button, Field, Select, Spinner, TextArea, TextInput } from './ui.jsx'

function formatDate(isoOrDate) {
  if (!isoOrDate) return null
  const d = new Date(isoOrDate)
  if (Number.isNaN(d.getTime())) return String(isoOrDate)
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(d)
}

function toDateInputValue(value) {
  if (!value) return ''
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export function TaskDrawer({
  open,
  mode,
  task,
  assigneeEmails = [],
  busy,
  onClose,
  onSave,
  onComplete,
  onDelete,
}) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: Status.TODO,
    priority: Priority.MEDIUM,
    dueDate: '',
    assigneeEmail: '',
  })
  const [localError, setLocalError] = useState(null)

  useEffect(() => {
    if (!open) return
    setLocalError(null)
    setForm({
      title: task?.title ?? '',
      description: task?.description ?? '',
      status: task?.status ?? Status.TODO,
      priority: task?.priority ?? Priority.MEDIUM,
      dueDate: toDateInputValue(task?.dueDate),
      assigneeEmail: task?.assigneeEmail ?? '',
    })
  }, [open, task])

  if (!open) return null

  const isEdit = mode === 'edit'
  const canComplete = isEdit && task?.status !== Status.DONE

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={() => (busy ? null : onClose())}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-xl border-l border-slate-800 bg-gradient-to-b from-slate-950 to-slate-950/80 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div className="grid">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              {isEdit ? 'Edit Task' : 'New Task'}
            </div>
            <div className="text-lg font-semibold text-slate-100">
              {isEdit ? task?.title || 'Untitled' : 'Create a task'}
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} disabled={busy}>
            Close
          </Button>
        </div>

        <div className="grid gap-4 p-5">
          {localError ? (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-100">
              {localError}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Title (required)">
              <TextInput
                value={form.title}
                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                placeholder="e.g., Finish UI for tasks"
              />
            </Field>

            <Field label="Assignee email (optional)">
              {assigneeEmails.length > 0 ? (
                <Select
                  value={form.assigneeEmail}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, assigneeEmail: e.target.value }))
                  }
                >
                  <option value="">Unassigned</option>
                  {assigneeEmails.map((email) => (
                    <option key={email} value={email}>
                      {email}
                    </option>
                  ))}
                </Select>
              ) : (
                <TextInput
                  value={form.assigneeEmail}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, assigneeEmail: e.target.value }))
                  }
                  placeholder="name@company.com"
                  inputMode="email"
                />
              )}
            </Field>

            <Field label="Status">
              <Select
                value={form.status}
                onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
                disabled={task?.status === Status.DONE}
              >
                <option value={Status.TODO}>To Do</option>
                <option value={Status.IN_PROGRESS}>In Progress</option>
                <option value={Status.DONE}>Done</option>
              </Select>
            </Field>

            <Field label="Priority">
              <Select
                value={form.priority}
                onChange={(e) => setForm((s) => ({ ...s, priority: e.target.value }))}
              >
                <option value={Priority.LOW}>Low</option>
                <option value={Priority.MEDIUM}>Medium</option>
                <option value={Priority.HIGH}>High</option>
              </Select>
            </Field>

            <Field label="Due date (required)">
              <TextInput
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm((s) => ({ ...s, dueDate: e.target.value }))}
              />
            </Field>

            <Field label="Completed at">
              <TextInput
                value={task?.completedAt ? formatDate(task.completedAt) : '—'}
                readOnly
                className="text-slate-300"
              />
            </Field>
          </div>

          <Field label="Description (optional)">
            <TextArea
              value={form.description}
              onChange={(e) =>
                setForm((s) => ({ ...s, description: e.target.value }))
              }
              placeholder="Add details, acceptance criteria, links, etc."
            />
          </Field>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Button
              onClick={() => {
                setLocalError(null)
                if (!form.title.trim()) {
                  setLocalError('Title is required.')
                  return
                }
                if (!form.dueDate) {
                  setLocalError('Due date is required.')
                  return
                }
                const payload = {
                  title: form.title.trim(),
                  description: form.description?.trim() || null,
                  status: form.status,
                  priority: form.priority,
                  dueDate: form.dueDate,
                  assigneeEmail: form.assigneeEmail?.trim() || null,
                }
                onSave(payload)
              }}
              disabled={busy}
            >
              {busy ? <Spinner className="border-slate-900/60 border-t-transparent" /> : null}
              Save
            </Button>

            {canComplete ? (
              <Button
                variant="secondary"
                onClick={onComplete}
                disabled={busy}
                className="bg-emerald-500/15 text-emerald-200 ring-1 ring-inset ring-emerald-500/30 hover:bg-emerald-500/25"
              >
                Mark complete
              </Button>
            ) : null}

            {isEdit ? (
              <Button variant="danger" onClick={onDelete} disabled={busy}>
                Delete…
              </Button>
            ) : null}
          </div>

          <div className="pt-2 text-xs text-slate-500">
            Tip: “Mark complete” will set status to DONE and record `completedAt` on the backend.
          </div>
        </div>
      </div>
    </div>
  )
}

