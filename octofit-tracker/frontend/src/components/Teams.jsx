import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const codespaceBaseUrl = typeof codespaceName === 'string' && codespaceName.trim()
    ? `https://${codespaceName.trim()}-8000.app.github.dev`
    : 'http://localhost:8000'

  return codespaceBaseUrl
}

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

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

  if (payload && Array.isArray(payload.teams)) {
    return payload.teams
  }

  return []
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function fetchTeams() {
      try {
        const response = await fetch(apiUrl)
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload?.message || 'Unable to fetch teams')
        }

        if (active) {
          setTeams(normalizeItems(payload))
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

    fetchTeams()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div className="alert alert-info">Loading teams...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Teams</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Coach</th>
              <th>Color</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id || team.name}>
                <td>{team.name}</td>
                <td>{team.coach}</td>
                <td>
                  <span
                    className="badge rounded-pill"
                    style={{ backgroundColor: team.color || '#4f46e5', color: '#fff' }}
                  >
                    {team.color || '#4f46e5'}
                  </span>
                </td>
                <td>{team.members ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Teams
