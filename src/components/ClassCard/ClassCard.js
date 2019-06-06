import React from "react";

export default function(props) {
  return (
    <li class="class-card open-position">
      <button name="apply" class="apply-button">
        <label for="apply">Click to Apply</label>
      </button>
      <button name="expand" class="expand">
        Click to Expand
      </button>
      <h4>{props.type} yoga</h4>
      <h5>
        {props.classDateDay}s @ {props.classDateTime}
      </h5>
      <h5>{props.studio} [link to studio page]</h5>
      <p>${props.wage}/hour</p>
    </li>
  );
}
