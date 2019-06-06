import React from "react";

export default function(props) {
  return (
    <header role="banner">
      <h1>Welcome, {props.firstName}!</h1>
    </header>
  );
}
