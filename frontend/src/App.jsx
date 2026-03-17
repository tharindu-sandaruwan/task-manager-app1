import { Outlet } from 'react-router-dom'
import { ToastProvider } from './components/toast.jsx'

function App() {
  return (
    <ToastProvider>
      <div className="min-h-full bg-slate-950 text-slate-100">
        <Outlet />
      </div>
    </ToastProvider>
  )
}

export default App
