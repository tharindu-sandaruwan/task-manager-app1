import { useEffect, useState } from 'react'
import { listUsers, createUser } from '../lib/usersApi.jsx'
import { Button, Spinner } from '../components/ui.jsx'
import { UserDrawer } from '../components/UserDrawer.jsx'
import { useToast } from '../components/toast.jsx'

export function UsersPage() {
  const toast = useToast()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  async function refresh() {
    setLoading(true)
    try {
      const data = await listUsers()
      setUsers(data)
    } catch (e) {
      toast.push({ variant: 'error', title: 'Failed to load users' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">Team Management</div>
          <h1 className="text-2xl font-semibold text-slate-50">Manage Users</h1>
        </div>
        <Button onClick={() => setIsDrawerOpen(true)}>Add User</Button>
      </header>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner className="h-8 w-8" /></div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map(user => (
            <div key={user.id} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-slate-100 font-medium">{user.username}</div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <UserDrawer 
        open={isDrawerOpen} 
        busy={busy}
        onClose={() => setIsDrawerOpen(false)}
        onSave={async (payload) => {
          setBusy(true)
          try {
            await createUser(payload)
            toast.push({ variant: 'success', title: 'User created' })
            setIsDrawerOpen(false)
            refresh()
          } catch (e) {
            toast.push({ variant: 'error', title: 'Error', message: e.message })
          } finally {
            setBusy(false)
          }
        }}
      />
    </div>
  )
}