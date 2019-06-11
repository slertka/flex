import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpa } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Header.css";

import NavBar from "../NavBar/NavBar";

export default function() {
  return (
    <div className="landing-header">
      <NavBar />
      <FontAwesomeIcon icon={faSpa} className="fa-3x" />
      <h1>Flex</h1>
      <h2>Build your yoga network</h2>
      <p>
        <Link to="/dashboard">[placeholder link for dashboard]</Link>
      </p>
    </div>
  );
}
