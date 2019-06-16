import React from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardSearch from "../DashboardSearch/DashboardSearch";
import DashboardClassList from "../DashboardClassList/DashboardClassList";

export class Dashboard extends React.Component {
  static contextType = AuthContext;

  render() {
    const jwt = this.context.jwt;
    console.log(jwt);

    return (
      <div>
        {!jwt ? <Redirect to="/login" /> : ""}
        <DashboardHeader />
        <DashboardSearch />
        <DashboardClassList {...this.props} />
      </div>
    );
  }
}

export default Dashboard;
