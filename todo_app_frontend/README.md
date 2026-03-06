# Todo App Frontend (React)

## Run locally (preview)
```bash
npm install
npm start
```

The app uses localStorage by default.

### Optional backend sync
If `REACT_APP_API_BASE` is set to a reachable backend that supports common REST todo endpoints, the UI will attempt to sync:
- GET/POST `/todos`
- PATCH/DELETE `/todos/:id`
(or `/api/todos` variants)

Environment variables are read from `.env`.
