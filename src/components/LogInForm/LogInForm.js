import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./LogInForm.css";
import AuthContext from "../../context/AuthContext";

import { API_URL } from "../../config";

export default class LogInForm extends React.Component {
  static contextType = AuthContext;

  state = {
    loginSuccess: false
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
    //why isn't my fetch request working??
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
        // redirect to Dashboard
        this.setState({
          loginSuccess: true
        });
        // store JWT and user in local storage
        localStorage.setItem("jwt", resj.jwt);
        localStorage.setItem("user", JSON.stringify(resj.user));
        // store JWT and user info in state
        this.context.setJwt(resj.jwt);
        this.context.setAuthUser(resj.user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const redirectToDashboard = this.state.loginSuccess ? (
      <Redirect to="/dashboard" />
    ) : (
      ""
    );
    return (
      <div className="log-in-form">
        {redirectToDashboard}
        <header>
          <h3>Log in</h3>
        </header>
        <form onSubmit={e => this.loginUser(e)}>
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
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    );
  }
}
