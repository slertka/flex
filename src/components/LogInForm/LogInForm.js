import React from "react";
import { Link } from "react-router-dom";

import "./LogInForm.css";

export default class LogInForm extends React.Component {
  render() {
    return (
      <div class="log-in-form">
        <header>
          <h3>Log in</h3>
        </header>
        <form>
          <div>
            <label htmlFor="user-email">Email: </label>
            <input type="text" name="user-email" />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" />
          </div>
        </form>
        <p>
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    );
  }
}
