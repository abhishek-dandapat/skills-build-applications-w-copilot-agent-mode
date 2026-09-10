import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const codespaceBaseUrl = typeof codespaceName === 'string' && codespaceName.trim()
    ? `https://${codespaceName.trim()}-8000.app.github.dev`
    : 'http://localhost:8000'

  return codespaceBaseUrl
}

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

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

  if (payload && Array.isArray(payload.leaderboard)) {
    return payload.leaderboard
  }

  return []
}

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function fetchLeaderboard() {
      try {
        const response = await fetch(apiUrl)
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload?.message || 'Unable to fetch leaderboard')
        }

        if (active) {
          setEntries(normalizeItems(payload))
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

    fetchLeaderboard()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Leaderboard</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id || `${entry.name}-${entry.rank}`}>
                <td>#{entry.rank ?? 0}</td>
                <td>{entry.name}</td>
                <td>{entry.teamName || 'Unassigned'}</td>
                <td>{entry.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard
