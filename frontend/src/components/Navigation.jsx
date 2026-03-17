import { Link, useLocation } from 'react-router-dom'
import { cn } from './ui.jsx'

export function Navigation() {
  const location = useLocation()

  const links = [
    { name: 'Tasks', path: '/' },
    { name: 'Team', path: '/users' },
  ]

  return (
    <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-sky-500 font-bold tracking-tighter text-xl">TASKLY</span>
          <div className="flex gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition",
                  location.pathname === link.path 
                    ? "bg-sky-500/10 text-sky-400" 
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}