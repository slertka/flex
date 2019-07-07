import React from "react";
import "./PostClassButton.css";

export default function(props) {
  return (
    <button
      className={props.editing ? "hidden postclass-button" : "postclass-button"}
      onClick={props.clickHandler}
    >
      Post Open Class
    </button>
  );
}
