import React from "react";
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
          {value => {
            return (
              <React.Fragment>
                {/* {!value.jwt ? <Redirect to="/login" /> : ""} */}
                <DashboardHeader />
                <DashboardSearch />
                <DashboardClassList {...this.props} />
              </React.Fragment>
            );
          }}
        </AuthContext.Consumer>
      </div>
    );
  }
}

export default Dashboard;
