import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Workouts from './components/Workouts'
import Leaderboard from './components/Leaderboard'

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

function App() {
  return (
    <div className="container-fluid p-0">
      <header className="bg-dark text-white shadow-sm">
        <div className="container py-3">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
            <div>
              <h1 className="h3 mb-0">OctoFit Tracker</h1>
              <small className="text-light">Mergington High School</small>
            </div>

            <nav className="nav nav-pills flex-wrap justify-content-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active bg-light text-dark' : 'text-white'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
