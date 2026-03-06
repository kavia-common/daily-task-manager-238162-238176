import React from "react";
import { Link } from "react-router-dom";

function Feature({ title, description }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 14,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.8)",
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <div style={{ color: "var(--muted)", lineHeight: 1.5 }}>{description}</div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Landing page shown on first load. Introduces the Todo app and routes users to /todos.
 */
export default function WelcomePage() {
  const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div className="badge" aria-label="App status badge">
            Daily Task Manager
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {frontendUrl ? (
            <a
              className="btn btnGhost"
              href={frontendUrl}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <span>Home URL</span>
              <span className="kbd">ENV</span>
            </a>
          ) : null}

          <Link
            className="btn btnPrimary"
            to="/todos"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <span>Open Todo App</span>
            <span aria-hidden="true" style={{ fontWeight: 900 }}>
              →
            </span>
          </Link>
        </div>
      </header>

      <main style={{ marginTop: 18 }}>
        <section
          className="card"
          style={{
            padding: 22,
            overflow: "hidden",
            position: "relative",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.10), rgba(6,182,212,0.08), rgba(255,255,255,1) 55%)",
          }}
          aria-label="Welcome hero"
        >
          <div style={{ maxWidth: 760 }}>
            <h1 style={{ margin: 0, fontSize: 34, letterSpacing: -0.6 }}>
              Welcome to your daily task manager
            </h1>
            <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.6 }}>
              A simple, minimal Todo app to capture tasks quickly, stay focused, and
              get things done.
            </p>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
              }}
            >
              <span className="badge" style={{ color: "var(--text)" }}>
                Accent: <span style={{ marginLeft: 6, color: "var(--primary)" }}>#3b82f6</span>
              </span>
              <span className="badge" style={{ color: "var(--text)" }}>
                Success: <span style={{ marginLeft: 6, color: "var(--success)" }}>#06b6d4</span>
              </span>
              <span className="badge">Light + minimal</span>
            </div>

            <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn btnPrimary" to="/todos">
                Get started
              </Link>
              <a className="btn btnGhost" href="#how-it-works">
                How it works
              </a>
            </div>

            <div style={{ marginTop: 14, color: "var(--muted)", fontSize: 13 }}>
              Tip: in the Todo view, add tasks fast and use <span className="kbd">Enter</span>{" "}
              to submit.
            </div>
          </div>
        </section>

        <section id="how-it-works" style={{ marginTop: 16 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            <Feature
              title="Add"
              description="Capture a task with a quick title and add it to your list."
            />
            <Feature
              title="Complete"
              description="Mark items done to keep the list clean and motivating."
            />
            <Feature
              title="Delete"
              description="Remove tasks you no longer need—no clutter, no distraction."
            />
            <Feature
              title="View"
              description="See your current tasks at a glance in a simple list layout."
            />
          </div>
        </section>

        <footer style={{ marginTop: 18, color: "var(--muted)", fontSize: 13 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              Built with React 17 • Theme background <span className="kbd">#f9fafb</span>
            </div>
            <div>
              <Link to="/todos" style={{ textDecoration: "underline" }}>
                Go to Todos
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
