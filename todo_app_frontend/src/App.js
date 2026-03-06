import React from "react";

/**
 * App root component.
 * Renders a simple "Hello World" page as requested.
 */
function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        color: "#111827",
        display: "grid",
        placeItems: "center",
        padding: 24
      }}
    >
      <section
        aria-label="Hello World Page"
        style={{
          width: "min(720px, 100%)",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 24
        }}
      >
        <header style={{ marginBottom: 12 }}>
          <h1 style={{ fontSize: 28, lineHeight: 1.2, margin: 0 }}>
            Hello World
          </h1>
          <p style={{ marginTop: 8, marginBottom: 0, color: "#64748b" }}>
            This is a simple HTML page rendered by the React frontend container.
          </p>
        </header>

        <article>
          <p style={{ margin: 0 }}>
            You can now build on this to implement the Todo UI.
          </p>
        </article>
      </section>
    </main>
  );
}

export default App;
