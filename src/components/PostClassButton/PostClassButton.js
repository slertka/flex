import React from "react";

export default function(props) {
  return (
    <button
      className={props.editing ? "hidden" : ""}
      onClick={props.clickHandler}
    >
      Post Open Class
    </button>
  );
}
