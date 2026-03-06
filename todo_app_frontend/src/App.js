import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  createLocalTodo,
  loadTodosFromStorage,
  persistTodosToStorage,
  reorderTodos,
  updateTodo
} from "./lib/todos";
import { ApiClient } from "./services/apiClient";

/**
 * A minimalistic Todo app UI.
 * - Header with title
 * - Input + Add button
 * - List of todos with Complete / Delete actions
 *
 * Uses localStorage persistence by default, and can optionally sync to a backend
 * if REACT_APP_API_BASE is set and the endpoints exist.
 */
export default function App() {
  const apiBase = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || "";
  const apiClient = useMemo(() => new ApiClient(apiBase), [apiBase]);

  const [todos, setTodos] = useState(() => loadTodosFromStorage());
  const [newTitle, setNewTitle] = useState("");
  const [uiError, setUiError] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    persistTodosToStorage(todos);
  }, [todos]);

  useEffect(() => {
    // Keep focus on the input for quick entry.
    inputRef.current?.focus();
  }, []);

  async function tryOptionalBackendHydrate() {
    // Best-effort: if backend exists, hydrate.
    if (!apiClient.isConfigured) return;

    try {
      setIsBusy(true);
      const remoteTodos = await apiClient.listTodos();
      if (Array.isArray(remoteTodos) && remoteTodos.length) {
        setTodos(reorderTodos(remoteTodos));
      }
    } catch (e) {
      // Silent by default: backend is optional for this frontend container.
      // You can uncomment next line if you want visible feedback.
      // setUiError("Backend unavailable; using local storage.");
    } finally {
      setIsBusy(false);
    }
  }

  useEffect(() => {
    void tryOptionalBackendHydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiClient.isConfigured]);

  function validateTitle(title) {
    const trimmed = title.trim();
    if (!trimmed) return { ok: false, reason: "Please enter a task." };
    if (trimmed.length > 140) return { ok: false, reason: "Task is too long (max 140 chars)." };
    return { ok: true, value: trimmed };
  }

  async function handleAddTodo(e) {
    e.preventDefault();
    setUiError("");

    const res = validateTitle(newTitle);
    if (!res.ok) {
      setUiError(res.reason);
      return;
    }

    const optimistic = createLocalTodo(res.value);

    // Optimistic update locally
    setTodos((prev) => [optimistic, ...prev]);
    setNewTitle("");

    // Best-effort sync to backend (if available)
    if (!apiClient.isConfigured) return;

    try {
      const created = await apiClient.createTodo({ title: optimistic.title });
      if (created && created.id) {
        // Replace optimistic item with backend item.
        setTodos((prev) =>
          prev.map((t) => (t.id === optimistic.id ? normalizeTodo(created) : t))
        );
      }
    } catch (err) {
      // Keep local todo; show non-blocking warning.
      setUiError("Saved locally. Backend sync failed.");
    }
  }

  async function handleToggleComplete(todo) {
    setUiError("");
    const nextCompleted = !todo.completed;

    // Optimistic local update
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updateTodo(t, { completed: nextCompleted }) : t)));

    if (!apiClient.isConfigured) return;

    try {
      const updated = await apiClient.updateTodo(todo.id, { completed: nextCompleted });
      if (updated) {
        setTodos((prev) => prev.map((t) => (t.id === todo.id ? normalizeTodo(updated) : t)));
      }
    } catch (err) {
      // Revert if backend is configured and update failed (to keep in sync).
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updateTodo(t, { completed: !nextCompleted }) : t)));
      setUiError("Could not update task on backend.");
    }
  }

  async function handleDelete(todo) {
    setUiError("");

    // Optimistic local remove
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));

    if (!apiClient.isConfigured) return;

    try {
      await apiClient.deleteTodo(todo.id);
    } catch (err) {
      setUiError("Could not delete task on backend (removed locally).");
    }
  }

  const remainingCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="page">
      <header className="header">
        <div className="header__inner">
          <div>
            <h1 className="title">Daily Task Manager</h1>
            <p className="subtitle">Add, complete, and clear tasks for today.</p>
          </div>
          <div className="status">
            <span className="pill" aria-label={`${remainingCount} remaining`}>
              {remainingCount} remaining
            </span>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="card" aria-label="Add a new todo">
          <form className="addRow" onSubmit={handleAddTodo}>
            <label className="srOnly" htmlFor="todoTitle">
              New task
            </label>
            <input
              id="todoTitle"
              ref={inputRef}
              className="input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What do you need to do?"
              maxLength={140}
              disabled={isBusy}
            />
            <button className="btn btnPrimary" type="submit" disabled={isBusy}>
              Add
            </button>
          </form>

          {uiError ? (
            <div className="alert" role="alert">
              {uiError}
            </div>
          ) : null}
        </section>

        <section className="card" aria-label="Todo list">
          <div className="listHeader">
            <h2 className="listTitle">Todos</h2>
            <span className="muted">
              {todos.length ? `${todos.length} total` : "No tasks yet"}
            </span>
          </div>

          <ul className="list" aria-label="Todos">
            {todos.map((todo) => (
              <li key={todo.id} className="item">
                <button
                  type="button"
                  className={todo.completed ? "check check--done" : "check"}
                  onClick={() => handleToggleComplete(todo)}
                  aria-label={todo.completed ? `Mark ${todo.title} as incomplete` : `Mark ${todo.title} as complete`}
                  title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                  {todo.completed ? "✓" : ""}
                </button>

                <div className="itemBody">
                  <div className={todo.completed ? "itemTitle itemTitle--done" : "itemTitle"}>
                    {todo.title}
                  </div>
                  <div className="itemMeta">
                    <span className="muted">Created {formatTime(todo.createdAt)}</span>
                  </div>
                </div>

                <div className="actions">
                  <button
                    type="button"
                    className="btn btnGhost"
                    onClick={() => handleToggleComplete(todo)}
                    aria-label={todo.completed ? `Uncomplete ${todo.title}` : `Complete ${todo.title}`}
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    type="button"
                    className="btn btnDanger"
                    onClick={() => handleDelete(todo)}
                    aria-label={`Delete ${todo.title}`}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="muted">
            {apiClient.isConfigured
              ? "Backend mode: attempting to sync via REACT_APP_API_BASE."
              : "Local mode: stored in your browser."}
          </span>
        </footer>
      </main>
    </div>
  );
}

function formatTime(isoOrMs) {
  try {
    const d = typeof isoOrMs === "number" ? new Date(isoOrMs) : new Date(isoOrMs);
    return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(d);
  } catch {
    return "just now";
  }
}

function normalizeTodo(t) {
  // Support different backend shapes (best-effort) while keeping UI stable.
  return {
    id: String(t.id ?? t._id ?? t.uuid ?? ""),
    title: String(t.title ?? t.text ?? ""),
    completed: Boolean(t.completed ?? t.done ?? false),
    createdAt: t.createdAt ?? t.created_at ?? Date.now()
  };
}
