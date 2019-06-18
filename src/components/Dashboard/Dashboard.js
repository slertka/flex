import React from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardSearch from "../DashboardSearch/DashboardSearch";
import DashboardClassList from "../DashboardClassList/DashboardClassList";

export class Dashboard extends React.Component {
  static contextType = AuthContext;

  render() {
    return (
      <div>
        <AuthContext.Consumer>
          {/* {!jwt ? <Redirect to="/login" /> : ""} */}
          <DashboardHeader />
          <DashboardSearch />
          <DashboardClassList {...this.props} />
        </AuthContext.Consumer>
      </div>
    );
  }
}

export default Dashboard;
