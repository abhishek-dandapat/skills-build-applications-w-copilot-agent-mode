# OctoFit Tracker Frontend

This React app talks to the Node.js API in the same Codespace environment or to localhost when running locally.

## Environment configuration

The app expects `VITE_CODESPACE_NAME` to be defined before the frontend starts. In GitHub Codespaces, add it to a local environment file such as `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is not set, the frontend falls back to `http://localhost:8000` instead of building a broken `https://undefined-8000...` URL.

## API endpoints

The app uses Vite environment variables and resolves the API base URL like this:

```js
const baseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'
```

The frontend fetches data from endpoints such as `/api/users/`, `/api/teams/`, `/api/activities/`, `/api/workouts/`, and `/api/leaderboard/`.
