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

  if (payload && Array.isArray(payload.activities)) {
    return payload.activities
  }

  return []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function fetchActivities() {
      try {
        const response = await fetch(buildApiUrl('/api/activities/'))
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload?.message || 'Unable to fetch activities')
        }

        if (active) {
          setActivities(normalizeItems(payload))
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

    fetchActivities()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div className="alert alert-info">Loading activities...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Activities</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Distance</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id || `${activity.userName}-${activity.type}-${activity.createdAt}`}>
                <td>{activity.userName}</td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes ?? 0} min</td>
                <td>{activity.distanceMiles ?? 0} mi</td>
                <td>{activity.notes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities
