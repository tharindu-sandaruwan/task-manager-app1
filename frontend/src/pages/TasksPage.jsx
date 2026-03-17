import { useEffect, useMemo, useRef, useState } from 'react'
import {
  createTask,
  deleteTask,
  listTasks,
  markComplete,
  Status,
  updateTask,
} from '../lib/tasksApi.jsx'
import { sortByDueDateAsc, sortByPriorityDesc } from '../lib/taskMeta.jsx'
import { extractUserEmails, listUsers } from '../lib/usersApi.jsx'
import { Button, Spinner } from '../components/ui.jsx'
import { FiltersPanel } from '../components/FiltersPanel.jsx'
import { TaskList } from '../components/TaskList.jsx'
import { TaskDrawer } from '../components/TaskDrawer.jsx'
import { ConfirmDialog } from '../components/ConfirmDialog.jsx'
import { useToast } from '../components/toast.jsx'

export function TasksPage() {
  const abortRef = useRef(null)
  const toast = useToast()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyAction, setBusyAction] = useState(false)
  const [error, setError] = useState(null)
  const [assigneeEmails, setAssigneeEmails] = useState([])

  const [statusFilter, setStatusFilter] = useState('ALL')
  const [assigneeFilter, setAssigneeFilter] = useState('')
  const [sort, setSort] = useState('DUE_DATE')

  const [drawer, setDrawer] = useState({ open: false, mode: 'create', task: null })
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  async function refresh() {
    abortRef.current?.abort?.()
    const controller = new AbortController()
    abortRef.current = controller
    setLoading(true)
    setError(null)
    try {
      const data = await listTasks({ signal: controller.signal })
      setTasks(Array.isArray(data) ? data : [])
    } catch (e) {
      if (e?.name === 'AbortError') return
      setError(e?.message || 'Failed to load tasks.')
    } finally {
      setLoading(false)
    }
  }

  async function refreshUsers() {
    const controller = new AbortController()
    try {
      const users = await listUsers({ signal: controller.signal })
      setAssigneeEmails(extractUserEmails(users))
    } catch {
      // If users can't be loaded, keep the dropdown empty; TaskDrawer will fallback to text input.
      setAssigneeEmails([])
    }
  }

  useEffect(() => {
    refresh()
    refreshUsers()
    return () => abortRef.current?.abort?.()
  }, [])

  const visibleTasks = useMemo(() => {
    let arr = [...tasks]
    if (statusFilter !== 'ALL') {
      arr = arr.filter((t) => t?.status === statusFilter)
    }
    const email = assigneeFilter.trim().toLowerCase()
    if (email) {
      arr = arr.filter((t) =>
        String(t?.assigneeEmail || '').toLowerCase().includes(email)
      )
    }
    if (sort === 'PRIORITY') arr.sort(sortByPriorityDesc)
    if (sort === 'DUE_DATE') arr.sort(sortByDueDateAsc)
    return arr
  }, [tasks, statusFilter, assigneeFilter, sort])

  const counts = useMemo(() => {
    const c = { ALL: tasks.length, TODO: 0, IN_PROGRESS: 0, DONE: 0 }
    for (const t of tasks) {
      if (t?.status === Status.TODO) c.TODO += 1
      if (t?.status === Status.IN_PROGRESS) c.IN_PROGRESS += 1
      if (t?.status === Status.DONE) c.DONE += 1
    }
    return c
  }, [tasks])

  const selectedTask = drawer.task

  return (
    <div className="min-h-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid gap-1">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Task Management
            </div>
            <h1 className="text-2xl font-semibold text-slate-50">
              Your work, organized.
            </h1>
            <p className="max-w-2xl text-sm text-slate-400">
              Create, assign, prioritize, and track tasks. Uses your backend endpoints under
              <span className="font-mono"> /tasks</span>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={refresh}
              disabled={loading || busyAction}
              title="Refresh"
            >
              {loading ? <Spinner /> : null}
              Refresh
            </Button>
            <Button
              onClick={() => setDrawer({ open: true, mode: 'create', task: null })}
              disabled={busyAction}
            >
              New task
            </Button>
          </div>
        </header>

        {error ? (
          <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
            <div className="font-semibold">Something went wrong</div>
            <div className="mt-1 text-rose-100/90">{error}</div>
            <div className="mt-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setError(null)
                  refresh()
                }}
              >
                Try again
              </Button>
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
          <FiltersPanel
            counts={counts}
            statusFilter={statusFilter}
            assigneeFilter={assigneeFilter}
            assigneeEmails={assigneeEmails}
            sort={sort}
            busy={busyAction}
            onStatusChange={setStatusFilter}
            onAssigneeChange={setAssigneeFilter}
            onSortChange={setSort}
            onReset={() => {
              setStatusFilter('ALL')
              setAssigneeFilter('')
              setSort('DUE_DATE')
            }}
          />

          <main className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-slate-100">
                Tasks
                <span className="ml-2 text-xs font-medium text-slate-400">
                  ({visibleTasks.length})
                </span>
              </div>
              <div className="text-xs text-slate-500">
                Click a task to view details and edit.
              </div>
            </div>

            <TaskList
              tasks={visibleTasks}
              loading={loading}
              onOpenCreate={() =>
                setDrawer({ open: true, mode: 'create', task: null })
              }
              onOpenEdit={(task) =>
                setDrawer({ open: true, mode: 'edit', task })
              }
            />
          </main>
        </div>
      </div>

      <TaskDrawer
        open={drawer.open}
        mode={drawer.mode}
        task={selectedTask}
        assigneeEmails={assigneeEmails}
        busy={busyAction}
        onClose={() =>
          busyAction ? null : setDrawer({ open: false, mode: 'create', task: null })
        }
        onSave={async (payload) => {
          setBusyAction(true)
          setError(null)
          try {
            if (drawer.mode === 'create') {
              await createTask(payload)
              toast.push({ variant: 'success', title: 'Task created' })
            } else {
              await updateTask(selectedTask?.id, payload)
              toast.push({ variant: 'success', title: 'Task updated' })
            }
            await refresh()
            setDrawer({ open: false, mode: 'create', task: null })
          } catch (e) {
            setError(e?.message || 'Save failed.')
            toast.push({
              variant: 'error',
              title: 'Save failed',
              message: e?.message || 'Please try again.',
              durationMs: 4200,
            })
          } finally {
            setBusyAction(false)
          }
        }}
        onComplete={async () => {
          setBusyAction(true)
          setError(null)
          try {
            await markComplete(selectedTask?.id)
            toast.push({ variant: 'success', title: 'Marked as complete' })
            await refresh()
            setDrawer({ open: false, mode: 'create', task: null })
          } catch (e) {
            setError(e?.message || 'Mark complete failed.')
            toast.push({
              variant: 'error',
              title: 'Could not complete task',
              message: e?.message || 'Please try again.',
              durationMs: 4200,
            })
          } finally {
            setBusyAction(false)
          }
        }}
        onDelete={() => setConfirmDeleteOpen(true)}
      />

      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Delete task?"
        message="This can’t be undone. The task will be permanently removed."
        busy={busyAction}
        onCancel={() => (busyAction ? null : setConfirmDeleteOpen(false))}
        onConfirm={async () => {
          setBusyAction(true)
          setError(null)
          try {
            await deleteTask(selectedTask?.id)
            toast.push({ variant: 'success', title: 'Task deleted' })
            setConfirmDeleteOpen(false)
            setDrawer({ open: false, mode: 'create', task: null })
            await refresh()
          } catch (e) {
            setError(e?.message || 'Delete failed.')
            toast.push({
              variant: 'error',
              title: 'Delete failed',
              message: e?.message || 'Please try again.',
              durationMs: 4200,
            })
          } finally {
            setBusyAction(false)
          }
        }}
      />
    </div>
  )
}

