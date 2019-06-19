import React from "react";
import "./SignUpForm.css";

import { Link, Redirect } from "react-router-dom";
import { API_URL } from "../../config";

import AuthContext from "../../context/AuthContext";

export default class SignUpForm extends React.Component {
  static contextType = AuthContext;

  state = {
    userCreated: false
  };

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
        // store JWT and user in local storage
        localStorage.setItem("jwt", resj.jwt);
        localStorage.setItem("user", JSON.stringify(resj.user));

        // store JWT and user info in state
        this.context.setJwt(resj.jwt);
        this.context.setAuthUser(resj.user);

        // Change state for redirect
        this.setState({
          userCreated: true
        });
      })
      .catch(err => {
        console.log(err);
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
    );
  }
}
