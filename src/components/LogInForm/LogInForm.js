import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./LogInForm.css";
import AuthContext from "../../context/AuthContext";

import { API_URL } from "../../config";
import Alert from "../Alert/Alert";

export default class LogInForm extends React.Component {
  static contextType = AuthContext;

  state = {
    loginSuccess: null
  };

  hideAlert = () => {
    this.setState({
      loginSuccess: null
    });
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
        <Alert
          message="Email or password does not match our records. Please try again."
          alertType="fail"
          handleAlert={this.hideAlert}
        />
      ) : (
        ""
      );

    return (
      <div className="log-in-form">
        {redirectToDashboard}
        <header>
          {unsuccessfulLogInAlert}

          <h3>Log in</h3>
        </header>
        <form onSubmit={this.loginUser}>
          <div className="login-input">
            <label htmlFor="user">Email: </label>
            <input
              type="text"
              name="user"
              placeholder="yogi@studio.com"
              className="email"
            />
          </div>
          <div className="login-input">
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" />
          </div>
          <input type="submit" />
        </form>
        <p className="redirect-signup">
          Haven't been here before? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    );
  }
}
