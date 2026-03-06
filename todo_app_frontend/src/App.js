import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import HelloWorldPage from "./pages/HelloWorldPage";

// PUBLIC_INTERFACE
function App() {
  /** Root app component with routes. */
  return (
    <Router>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div style={styles.title}>Daily Task Manager</div>
          <nav style={styles.nav}>
            <Link style={styles.navLink} to="/">
              Home
            </Link>
            <Link style={styles.navLink} to="/hello">
              Hello
            </Link>
          </nav>
        </header>

        <main style={styles.main}>
          <Switch>
            <Route exact path="/hello">
              <HelloWorldPage />
            </Route>

            <Route path="/">
              <section style={styles.card}>
                <h1 style={styles.h1}>Home</h1>
                <p style={styles.p}>
                  Use the navigation above to open the Hello World page.
                </p>
                <p style={styles.p}>
                  <Link to="/hello">Go to /hello</Link>
                </p>
              </section>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  shell: {
    minHeight: "100vh",
    background: "#f9fafb",
    color: "#111827",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  header: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 700,
    letterSpacing: "-0.01em",
  },
  nav: {
    display: "flex",
    gap: 12,
  },
  navLink: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: 600,
  },
  main: {
    padding: 18,
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 820,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 18,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  h1: { margin: "0 0 10px 0", fontSize: 20 },
  p: { margin: "0 0 10px 0", color: "#374151" },
};

export default App;
