import { Status } from '../lib/tasksApi.jsx'
import { Button, Field, Select, TextInput } from './ui.jsx'

export function FiltersPanel({
  counts,
  statusFilter,
  assigneeFilter,
  assigneeEmails = [],
  sort,
  busy,
  onStatusChange,
  onAssigneeChange,
  onSortChange,
  onReset,
}) {
  return (
    <aside className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold text-slate-100">Filters</div>
      <div className="mt-4 grid gap-3">
        <Field label="Status">
          <Select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="ALL">All ({counts.ALL})</option>
            <option value={Status.TODO}>To Do ({counts.TODO})</option>
            <option value={Status.IN_PROGRESS}>In Progress ({counts.IN_PROGRESS})</option>
            <option value={Status.DONE}>Done ({counts.DONE})</option>
          </Select>
        </Field>

        <Field label="Assigned to">
          {assigneeEmails.length > 0 ? (
            <Select value={assigneeFilter} onChange={(e) => onAssigneeChange(e.target.value)}>
              <option value="">All assignees</option>
              {assigneeEmails.map((email) => (
                <option key={email} value={email}>
                  {email}
                </option>
              ))}
            </Select>
          ) : (
            <TextInput
              value={assigneeFilter}
              onChange={(e) => onAssigneeChange(e.target.value)}
              placeholder="Type assignee email…"
            />
          )}
        </Field>

        <Field label="Sort">
          <Select value={sort} onChange={(e) => onSortChange(e.target.value)}>
            <option value="DUE_DATE">Due date (soonest first)</option>
            <option value="PRIORITY">Priority (high → low)</option>
            <option value="NONE">None</option>
          </Select>
        </Field>

        <div className="pt-1">
          <Button
            variant="ghost"
            onClick={onReset}
            disabled={busy}
            className="w-full"
          >
            Reset filters
          </Button>
        </div>
      </div>
    </aside>
  )
}

