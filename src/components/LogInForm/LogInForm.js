import React from "react";
import { Link, Redirect, BrowserRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Animated } from "react-animated-css";
import "./LogInForm.css";
import AuthContext from "../../context/AuthContext";

import { API_URL } from "../../config";
import Alert from "../Alert/Alert";

export default class LogInForm extends React.Component {
  static contextType = AuthContext;

  state = {
    loginSuccess: null
  };

  loginUser = e => {
    e.preventDefault();

    // extract data from form
    const { user, password } = e.target;
    const payload = { username: user.value, password: password.value };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };

    fetch(`${API_URL}/user/login`, options)
      .then(res => {
        if (!res.ok) {
          return this.setState({
            loginError: true
          });
        }
        return res.json();
      })
      .then(resj => {
        // store JWT and user in local storage
        localStorage.setItem("jwt", resj.jwt);
        localStorage.setItem("user", JSON.stringify(resj.user));

        // store JWT and user info in state
        this.context.setJwt(resj.jwt);
        this.context.setAuthUser(resj.user);

        // redirect to Dashboard
        this.setState({
          loginSuccess: true
        });
      })
      .catch(() => {
        this.setState({
          loginSuccess: false
        });
      });
  };

  render() {
    const redirectToDashboard = this.state.loginSuccess ? (
      <Redirect to="/dashboard" />
    ) : (
      ""
    );

    const unsuccessfulLogInAlert =
      this.state.loginSuccess === false ? (
        <Alert message="Email or password does not match our records. Please try again." />
      ) : (
        ""
      );

    return (
      <BrowserRouter>
        <div className="log-in-form">
          {redirectToDashboard}
          <header>
            <h3>Log in</h3>
          </header>
          {unsuccessfulLogInAlert}
          <form onSubmit={this.loginUser}>
            <div>
              <label htmlFor="user">Email: </label>
              <input type="text" name="user" placeholder="Email Address" />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" />
            </div>
            <input type="submit" />
          </form>
          <p>
            Haven't been here before? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </BrowserRouter>
    );
  }
}
