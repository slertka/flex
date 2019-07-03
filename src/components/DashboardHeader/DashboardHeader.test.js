import React from "react";
import DashboardHeader from "./DashboardHeader";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<DashboardHeader />);
});
