import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Minimal Todo view placeholder for navigation validation.
 * This keeps the focus of this subtask on the Welcome landing page while ensuring
 * routes are functional.
 */
export default function TodoPage() {
  const [items, setItems] = useState([{ id: "1", title: "Try the app", completed: false }]);
  const [title, setTitle] = useState("");

  const remaining = useMemo(() => items.filter((i) => !i.completed).length, [items]);

  function addTodo(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setItems((prev) => [
      { id: String(Date.now()), title: trimmed, completed: false },
      ...prev,
    ]);
    setTitle("");
  }

  function toggleTodo(id) {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 900, letterSpacing: -0.3, fontSize: 18 }}>
            Todos
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>
            {remaining} remaining
          </div>
        </div>
        <Link className="btn btnGhost" to="/">
          ← Back
        </Link>
      </header>

      <main className="card" style={{ marginTop: 14, padding: 16 }}>
        <form onSubmit={addTodo} style={{ display: "flex", gap: 10 }}>
          <label style={{ flex: 1 }}>
            <span className="srOnly" style={{ position: "absolute", left: -9999 }}>
              Todo title
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a task..."
              style={{
                width: "100%",
                padding: "12px 12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                outline: "none",
              }}
            />
          </label>
          <button className="btn btnPrimary" type="submit">
            Add
          </button>
        </form>

        <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "grid", gap: 10 }}>
          {items.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                padding: 12,
                border: "1px solid var(--border)",
                borderRadius: 12,
                background: "rgba(255,255,255,0.7)",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={() => toggleTodo(t.id)}
                className="btn btnGhost"
                aria-pressed={t.completed}
                style={{
                  padding: "8px 10px",
                  borderRadius: 10,
                  borderColor: t.completed ? "rgba(6,182,212,0.35)" : "var(--border)",
                }}
              >
                {t.completed ? "Done" : "Todo"}
              </button>

              <div
                style={{
                  flex: 1,
                  textDecoration: t.completed ? "line-through" : "none",
                  color: t.completed ? "var(--muted)" : "var(--text)",
                }}
              >
                {t.title}
              </div>

              <button
                type="button"
                onClick={() => deleteTodo(t.id)}
                className="btn btnGhost"
                style={{ borderColor: "rgba(239,68,68,0.35)", color: "var(--danger)" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
