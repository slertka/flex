import React from "react";
import { Link } from "react-router-dom";

export default function(props) {
  return (
    <div>
      <header role="banner">
        <h1>Welcome, {props.firstName}!</h1>
      </header>
      <p>
        <Link to="/">[log out link placeholder]</Link>
      </p>
    </div>
  );
}
