import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./styles.css";
import WelcomePage from "./pages/WelcomePage";
import TodoPage from "./pages/TodoPage";

/**
 * PUBLIC_INTERFACE
 * Root application component. Sets up routing and renders the landing Welcome page
 * on first load, with navigation to the Todo UI.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/todos" component={TodoPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
