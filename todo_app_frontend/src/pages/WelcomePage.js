import React from "react";

/**
 * Minimal, light-themed welcome screen for the Todo app.
 * This is intentionally simple and matches the project's modern/minimal style.
 */

// PUBLIC_INTERFACE
function WelcomePage() {
  /** Welcome/landing view for the frontend. */
  const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  return (
    <div className="page">
      <header className="header">
        <div className="brand">
          <div className="logo" aria-hidden="true">
            DT
          </div>
          <div>
            <h1 className="title">Daily Task Manager</h1>
            <p className="subtitle">A clean, minimal way to manage your todos.</p>
          </div>
        </div>
      </header>

      <main className="card" role="main" aria-labelledby="welcome-heading">
        <h2 id="welcome-heading" className="cardTitle">
          Welcome
        </h2>
        <p className="cardText">
          Add tasks, mark them complete, and keep your day on track.
        </p>

        <div className="ctaRow">
          <a className="primaryBtn" href="#app" aria-label="Get started">
            Get started
          </a>
          <a className="secondaryBtn" href={frontendUrl || "#"} aria-label="Frontend URL">
            Frontend URL
          </a>
        </div>

        <dl className="meta">
          <div className="metaRow">
            <dt>Theme</dt>
            <dd>Light</dd>
          </div>
          <div className="metaRow">
            <dt>Backend</dt>
            <dd className="mono">{backendUrl || "Not configured"}</dd>
          </div>
        </dl>

        <p className="hint" id="app">
          Next: this is where the Todo list UI will live.
        </p>
      </main>

      <footer className="footer">
        <span className="footerText">Minimal. Modern. Fast.</span>
      </footer>
    </div>
  );
}

export default WelcomePage;
