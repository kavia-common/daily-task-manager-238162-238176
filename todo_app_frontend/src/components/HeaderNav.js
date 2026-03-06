import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Top header with app title and simple navigation.
 */
export default function HeaderNav() {
  return (
    <header className="header" role="banner">
      <div className="headerInner">
        <div className="brand" aria-label="Daily Task Manager">
          Daily Task Manager
        </div>

        <nav className="nav" aria-label="Primary navigation">
          <NavLink exact to="/" className="navLink" activeClassName="navLinkActive">
            Todos
          </NavLink>
          <NavLink to="/about" className="navLink" activeClassName="navLinkActive">
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
