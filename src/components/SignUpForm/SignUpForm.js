import React from "react";
import "./SignUpForm.css";

import { Link, Redirect } from "react-router-dom";
import { API_URL } from "../../config";

import AuthContext from "../../context/AuthContext";

export default class SignUpForm extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      userCreated: false
    };
  }

  createUser = e => {
    e.preventDefault();
    const {
      type,
      studio,
      firstName,
      lastName,
      email,
      password,
      confirmPass
    } = e.target;

    const userInfo = {
      type: type.value,
      studio: studio.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPass: confirmPass.value
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    };

    fetch(`${API_URL}/user/signup`, options)
      .then(res => {
        if (res.status === 422) {
          return this.setState({
            userCreated: false
          });
        }
        return res.json();
      })
      .then(resj => {
        // Store user data in local storage
        localStorage.setItem("jwt", resj.jwt);
        localStorage.setItem("user", JSON.stringify(resj.user));
        // Store JWT in state
        this.context.setJwt(resj.jwt);
        // Store AuthUser in state
        this.context.setAuthUser(resj.user);
        // Change state for redirect
        this.setState({
          userCreated: true
        });
        console.log(this.context);
      })
      .catch(err => {
        console.log(err);
        // highlight fields that have an error?
      });
  };

  render() {
    const redirectToDashboard = this.state.userCreated ? (
      <Redirect to="/dashboard" />
    ) : (
      ""
    );
    return (
      <AuthContext.Consumer>
        {() => (
          <form className="sign-up-form" onSubmit={e => this.createUser(e)}>
            {redirectToDashboard}
            <header>
              <h3>Sign up now</h3>
            </header>
            <div>
              <select name="type">
                <option value="studio">Studio</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
            <div>
              <label htmlFor="studio">Studio: </label>
              <input type="text" name="studio" />
            </div>

            <div>
              <label htmlFor="firstName">First Name: </label>
              <input type="text" name="firstName" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name: </label>
              <input type="text" name="lastName" />
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input type="text" name="email" />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" />
            </div>
            <div>
              <label htmlFor="confirmPass">Verify Password: </label>
              <input type="password" name="confirmPass" />
            </div>
            <input type="submit" />
            <p>
              Already joined us? <Link to="/login">Log in</Link>
            </p>
          </form>
        )}
      </AuthContext.Consumer>
    );
  }
}
