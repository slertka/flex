import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import NavBar from "../NavBar/NavBar";

export default function() {
  return (
    <div>
      <NavBar />
      <h1>Flex</h1>
      <h2>Build your yoga network</h2>
      [screen shot of example dashboard from instructor POV]
      <p>
        <Link to="/dashboard">[placeholder link for dashboard]</Link>
      </p>
    </div>
  );
}
