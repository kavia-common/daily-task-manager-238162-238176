import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import HeaderNav from "./components/HeaderNav";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

/**
 * Root application component.
 * Provides top-level routing and layout wrapper.
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="appShell">
        <HeaderNav />
        <main className="appMain" role="main">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}
