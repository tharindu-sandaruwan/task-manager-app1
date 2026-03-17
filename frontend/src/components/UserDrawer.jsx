import { useEffect, useState } from 'react'
import { Button, Field, TextInput } from './ui.jsx'

export function UserDrawer({ open, busy, onClose, onSave }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [localError, setLocalError] = useState(null)

  useEffect(() => {
    if (open) {
      setForm({ username: '', email: '', password: '' })
      setLocalError(null)
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => (busy ? null : onClose())} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md border-l border-slate-800 bg-gradient-to-b from-slate-950 to-slate-950/80 p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-slate-100">Add New User</h2>
          <Button variant="ghost" onClick={onClose} disabled={busy}>Close</Button>
        </div>

        <div className="grid gap-4">
          {localError && <div className="text-rose-400 text-sm">{localError}</div>}
          
          <Field label="Username">
            <TextInput 
              value={form.username} 
              onChange={e => setForm({...form, username: e.target.value})} 
              placeholder="e.g. tharindu_s"
            />
          </Field>
          <Field label="Email Address">
            <TextInput 
              type="email"
              value={form.email} 
              onChange={e => setForm({...form, email: e.target.value})} 
              placeholder="name@example.com"
            />
          </Field>
          <Field label="Password">
            <TextInput 
              type="password"
              value={form.password} 
              onChange={e => setForm({...form, password: e.target.value})} 
            />
          </Field>

          <Button 
            className="mt-4" 
            disabled={busy}
            onClick={() => {
              if(!form.username || !form.email || !form.password) return setLocalError("All fields required");
              onSave(form);
            }}
          >
            Create User
          </Button>
        </div>
      </div>
    </div>
  )
}