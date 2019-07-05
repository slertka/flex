import React from "react";
import { Link } from "react-router-dom";

// Context
import AuthContext from "../../context/AuthContext";

export default class DashboardHeader extends React.Component {
  static contextType = AuthContext;

  logOutUser = () => {
    // remove jwt and user from state / context
    this.context.setJwt("");
    this.context.setAuthUser({});

    // remove jwt and user from localStoraget
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
  };

  render() {
    const firstName = this.context.user ? this.context.user.firstName : "";

    return (
      <div>
        <header role="banner">
          <h1>Welcome, {firstName}!</h1>
        </header>
        <p>
          <Link to="/">
            <button className="logout-button" onClick={this.logOutUser}>
              Sign Out
            </button>
          </Link>
        </p>
      </div>
    );
  }
}
