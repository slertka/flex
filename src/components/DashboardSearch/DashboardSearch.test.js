import React from "react";
import DashboardSearch from "./DashboardSearch";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<DashboardSearch />);
});
