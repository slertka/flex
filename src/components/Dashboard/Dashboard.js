import React from "react";

import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardSearch from "../DashboardSearch/DashboardSearch";
import DashboardClassList from "../DashboardClassList/DashboardClassList";

// Context
import ClassContext from "../../context/ClassContext";

export class Dashboard extends React.Component {
  static contextType = ClassContext;

  render() {
    return (
      <div>
        <DashboardHeader firstName={this.context.user.firstName} />
        <DashboardSearch />
        <DashboardClassList
          classes={this.context.classes}
          profile={this.context.user.type}
        />
      </div>
    );
  }
}

export default Dashboard;
