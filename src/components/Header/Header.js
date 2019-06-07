import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function() {
  return (
    <div>
      <header role="banner">
        <h1>Flex</h1>
        <h2>Build your yoga network</h2>
        [screen shot of example dashboard from instructor POV]
      </header>
      <p>
        <Link to="/dashboard">[placeholder link for dashboard]</Link>
      </p>
    </div>
  );
}
