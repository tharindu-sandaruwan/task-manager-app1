import { Outlet } from 'react-router-dom'
import { ToastProvider } from './components/toast.jsx'
import { Navigation } from './components/Navigation.jsx'

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navigation />
        <main>
          <Outlet />
        </main>
      </div>
    </ToastProvider>
  )
}

export default App