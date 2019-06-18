import React from "react";
import { Link } from "react-router-dom";

// Context
import AuthContext from "../../context/AuthContext";

export default class DashboardHeader extends React.Component {
  static contextType = AuthContext;

  render() {
    const { user } = this.context;
    console.log(this.context);

    return (
      <div>
        <header role="banner">
          <h1>Welcome, {user.firstName}!</h1>
        </header>
        <p>
          <Link to="/">[log out link placeholder]</Link>
        </p>
      </div>
    );
  }
}
