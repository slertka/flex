import React from "react";

import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardSearch from "../DashboardSearch/DashboardSearch";
import DashboardClassList from "../DashboardClassList/DashboardClassList";

export class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <DashboardHeader />
        <DashboardSearch />
        <DashboardClassList />
      </div>
    );
  }
}

export default Dashboard;
