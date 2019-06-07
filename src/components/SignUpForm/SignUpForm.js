import React from "react";
import { Link } from "react-router-dom";
import "./SignUpForm.css";

export default class SignUpForm extends React.Component {
  render() {
    return (
      <div className="sign-up-form">
        <header>
          <h3>Sign up now</h3>
        </header>
        <div>
          <select>
            <option value="studio">Studio / Studio Manager</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        <div>
          <label htmlFor="user-email">Email: </label>
          <input type="text" name="user-email" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" />
        </div>
        <div>
          <label htmlFor="password-verify">Verify Password: </label>
          <input type="password" name="password-verify" />
        </div>
        <input type="submit" />
        <p>
          Already joined us? <Link to="/login">Log in</Link>
        </p>
      </div>
    );
  }
}
