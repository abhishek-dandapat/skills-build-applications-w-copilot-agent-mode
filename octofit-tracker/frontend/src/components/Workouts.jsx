import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  if (typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const buildApiUrl = (path) => new URL(path, `${getApiBaseUrl()}/`).toString()

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items
  }

  if (payload && Array.isArray(payload.workouts)) {
    return payload.workouts
  }

  return []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function fetchWorkouts() {
      try {
        const response = await fetch(buildApiUrl('/api/workouts/'))
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload?.message || 'Unable to fetch workouts')
        }

        if (active) {
          setWorkouts(normalizeItems(payload))
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError.message)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchWorkouts()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div className="alert alert-info">Loading workouts...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Workouts</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Difficulty</th>
              <th>Focus</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id || workout.title}>
                <td>{workout.title}</td>
                <td>{workout.category}</td>
                <td>{workout.durationMinutes ?? 0} min</td>
                <td>{workout.difficulty || 'Beginner'}</td>
                <td>{Array.isArray(workout.focus) ? workout.focus.join(', ') : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Workouts
