import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// PUBLIC_INTERFACE
function renderApp() {
  /** Render the root React application into the DOM. */
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

renderApp();
