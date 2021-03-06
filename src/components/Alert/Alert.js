import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Animated } from "react-animated-css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Alert.css";

export default function(props) {
  return (
    <Animated animationInDelay={50}>
      <div className="success">
        {props.message}
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => props.handleAlert()}
          className="exit"
        />
      </div>
    </Animated>
  );
}
