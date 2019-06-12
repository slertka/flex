import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./SignUpForm.css";

import { API_URL } from "../../config";

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // set default to studio (first select) if no option is not changed
      type: "studio"
    };
  }

  setProfileType(e) {
    this.setState({
      type: e.target.value
    });
  }

  updateStateWithInput(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  createUser = e => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    };
    fetch(`${API_URL}/user/signup`, options)
      .then(res => res.json())
      .then(resj => {
        // Change state for redirect
        this.setState({
          userCreated: true
        });
        // Store JWT in local storage
        localStorage.setItem("jwt", resj.jwt);
        // Set AuthContext
      });
  };

  render() {
    const redirectToDashboard = this.state.userCreated ? (
      <Redirect to="/dashboard" />
    ) : (
      ""
    );
    return (
      <form className="sign-up-form" onSubmit={e => this.createUser(e)}>
        {redirectToDashboard}
        <header>
          <h3>Sign up now</h3>
        </header>
        <div>
          <select onChange={e => this.setProfileType(e)}>
            <option value="studio">Studio</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        <div>
          <label htmlFor="user-studio">Studio: </label>
          <input
            type="text"
            name="user-studio"
            onChange={e => this.updateStateWithInput(e, "studio")}
          />
        </div>

        <div>
          <label htmlFor="user-firstName">First Name: </label>
          <input
            type="text"
            name="user-firstName"
            onChange={e => this.updateStateWithInput(e, "firstName")}
          />
        </div>
        <div>
          <label htmlFor="user-lastName">Last Name: </label>
          <input
            type="text"
            name="user-lastName"
            onChange={e => this.updateStateWithInput(e, "lastName")}
          />
        </div>
        <div>
          <label htmlFor="user-email">Email: </label>
          <input
            type="text"
            name="user-email"
            onChange={e => this.updateStateWithInput(e, "email")}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            onChange={e => this.updateStateWithInput(e, "password")}
          />
        </div>
        <div>
          <label htmlFor="password-verify">Verify Password: </label>
          <input
            type="password"
            name="password-verify"
            onChange={e => this.updateStateWithInput(e, "confirmPass")}
          />
        </div>
        <input type="submit" />
        <p>
          Already joined us? <Link to="/login">Log in</Link>
        </p>
      </form>
    );
  }
}
