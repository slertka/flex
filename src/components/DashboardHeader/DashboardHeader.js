import React from "react";
import "./DashboardHeader.css";

import DashboardNavBar from "../DashboardNavBar/DashboardNavBar";

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

    const profile = this.context.user ? this.context.user.type : "";

    return (
      <div className="dashboard-header">
        <DashboardNavBar
          logOutUser={() => this.logOutUser()}
          profile={profile}
        />
        <header role="banner">
          <h1>Welcome, {firstName}!</h1>
        </header>
        <div id="logo-header">
          <h5 className="dash-logo">FLEX</h5>
        </div>
      </div>
    );
  }
}
