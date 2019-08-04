import React from "react";
import AuthContext from "../../context/AuthContext";
import { Redirect } from "react-router-dom";
import { API_URL } from "../../config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpa } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

import NavBar from "../NavBar/NavBar";

export default class Header extends React.Component {
  static contextType = AuthContext;

  state = {
    startDemo: false
  };

  demoInstructorLogin = () => {
    const payload = {
      username: "instructor@test.com",
      password: "password"
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };

    fetch(`${API_URL}/user/login`, options)
      .then(res => res.json())
      .then(resj => {
        // store JWT and user in local storage
        localStorage.setItem("jwt", resj.jwt);
        localStorage.setItem("user", JSON.stringify(resj.user));

        // store JWT and user info in state
        this.context.setJwt(resj.jwt);
        this.context.setAuthUser(resj.user);

        // redirect to dashboard
        this.setState({ startDemo: true });
      });
  };

  demoStudioLogin = () => {
    const payload = {
      username: "studio@test.com",
      password: "password"
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };

    fetch(`${API_URL}/user/login`, options)
      .then(res => res.json())
      .then(resj => {
        // store JWT and user in local storage
        localStorage.setItem("jwt", resj.jwt);
        localStorage.setItem("user", JSON.stringify(resj.user));

        // store JWT and user info in state
        this.context.setJwt(resj.jwt);
        this.context.setAuthUser(resj.user);

        // redirect to dashboard
        this.setState({ startDemo: true });
      });
  };

  render() {
    const initiateDemo = this.state.startDemo ? (
      <Redirect to="/dashboard" />
    ) : (
      ""
    );

    return (
      <div className="landing-header">
        {initiateDemo}
        <NavBar />
        <FontAwesomeIcon icon={faSpa} className="fa-5x main-icon" />
        <h1>F L E X</h1>
        <button onClick={() => this.demoInstructorLogin()}>
          Instructor Demo
        </button>
        <button onClick={() => this.demoStudioLogin()}>Studio Demo</button>
      </div>
    );
  }
}
