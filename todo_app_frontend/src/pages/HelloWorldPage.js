import React from "react";

// PUBLIC_INTERFACE
function HelloWorldPage() {
  /** Simple Hello World "HTML page" rendered by React, reachable at /hello. */
  return (
    <section style={styles.card}>
      <h1 style={styles.h1}>Hello World</h1>
      <p style={styles.p}>
        This is a simple HTML page rendered inside the React app.
      </p>

      <div style={styles.divider} />

      <article>
        <h2 style={styles.h2}>Basic HTML Elements</h2>
        <ul style={styles.ul}>
          <li>
            <strong>Heading:</strong> “Hello World”
          </li>
          <li>
            <strong>Paragraph:</strong> descriptive text
          </li>
          <li>
            <strong>List:</strong> this list
          </li>
        </ul>
      </article>
    </section>
  );
}

const styles = {
  card: {
    width: "100%",
    maxWidth: 820,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 18,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  h1: { margin: "0 0 10px 0", fontSize: 24, letterSpacing: "-0.01em" },
  h2: { margin: "14px 0 8px 0", fontSize: 16 },
  p: { margin: 0, color: "#374151" },
  divider: { height: 1, background: "#e5e7eb", margin: "14px 0" },
  ul: { margin: 0, paddingLeft: 18, color: "#374151" },
};

export default HelloWorldPage;
