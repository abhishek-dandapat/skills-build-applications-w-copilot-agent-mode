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

  if (payload && Array.isArray(payload.users)) {
    return payload.users
  }

  return []
}

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function fetchUsers() {
      try {
        const response = await fetch(buildApiUrl('/api/users/'))
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload?.message || 'Unable to fetch users')
        }

        if (active) {
          setUsers(normalizeItems(payload))
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

    fetchUsers()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div className="alert alert-info">Loading users...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Users</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
              <th>Fitness</th>
              <th>Points</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.email || user.name}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.teamName || 'Unassigned'}</td>
                <td>{user.fitnessLevel || 'Starter'}</td>
                <td>{user.points ?? 0}</td>
                <td>{user.streak ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users
