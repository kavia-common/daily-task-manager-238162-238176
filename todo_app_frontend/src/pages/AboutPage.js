import React from "react";

/**
 * About page describing the app.
 */
export default function AboutPage() {
  return (
    <section className="card" aria-labelledby="aboutTitle">
      <h1 id="aboutTitle" className="pageTitle">
        About
      </h1>
      <p className="muted">
        This is a simple, minimal todo app for managing daily tasks. Add a task,
        mark it complete, or remove it when you’re done.
      </p>

      <div className="divider" />

      <h2 className="sectionTitle">Tips</h2>
      <ul className="list">
        <li>Keep todos short and actionable.</li>
        <li>Complete tasks as you go to stay focused.</li>
        <li>Delete finished items to keep the list clean.</li>
      </ul>
    </section>
  );
}
