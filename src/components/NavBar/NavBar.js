import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

export default function() {
  return (
    <header className="nav-bar">
      <div />
      <div className="nav-icon">
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div />
      <div className="spacer" />
      <div className="nav_items">
        <ul>
          <li>
            <Link to="/">Flex</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
