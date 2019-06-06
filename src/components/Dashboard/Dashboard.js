import React from "react";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardSearch from "../DashboardSearch/DashboardSearch";
import DashboardClassList from "../DashboardClassList/DashboardClassList";

const DASHBOARD_DATA = {
  user: {
    type: "studio", // studio
    firstName: "Ingrid",
    lastName: "Instructor",
    email: "ingrid@yoga.com",
    password: "securepw"
  },
  classes: [
    {
      type: "vinyasa",
      wage: 35,
      length: 60,
      studio: "Flow & Joe",
      startDate: new Date(2019, 6, 15),
      classDateDay: "Monday",
      classDateTime: "17:30"
    },
    {
      type: "hatha",
      wage: 35,
      length: 75,
      studio: "Corepower Yoga",
      startDate: new Date(2019, 6, 12),
      classDateDay: "Wednesday",
      classDateTime: "18:30"
    }
  ]
};

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <DashboardHeader {...DASHBOARD_DATA.user} />
        <DashboardSearch />
        <DashboardClassList
          classes={DASHBOARD_DATA.classes}
          profile={DASHBOARD_DATA.user.type}
        />
      </div>
    );
  }
}
