import { Priority, Status } from './tasksApi.jsx'

export function priorityMeta(priority) {
  switch (priority) {
    case Priority.HIGH:
      return { label: 'High', dot: 'bg-rose-400', text: 'text-rose-200' }
    case Priority.MEDIUM:
      return { label: 'Medium', dot: 'bg-amber-400', text: 'text-amber-200' }
    case Priority.LOW:
    default:
      return { label: 'Low', dot: 'bg-emerald-400', text: 'text-emerald-200' }
  }
}

export function statusMeta(status) {
  switch (status) {
    case Status.IN_PROGRESS:
      return {
        label: 'In Progress',
        chip: 'bg-sky-500/15 text-sky-200 ring-sky-400/30',
      }
    case Status.DONE:
      return {
        label: 'Done',
        chip: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/30',
      }
    case Status.TODO:
    default:
      return {
        label: 'To Do',
        chip: 'bg-slate-500/15 text-slate-200 ring-slate-400/30',
      }
  }
}

export function sortByPriorityDesc(a, b) {
  const rank = { HIGH: 3, MEDIUM: 2, LOW: 1 }
  return (rank[b?.priority] || 0) - (rank[a?.priority] || 0)
}

export function sortByDueDateAsc(a, b) {
  const ad = a?.dueDate ? new Date(a.dueDate).getTime() : Number.POSITIVE_INFINITY
  const bd = b?.dueDate ? new Date(b.dueDate).getTime() : Number.POSITIVE_INFINITY
  return ad - bd
}

