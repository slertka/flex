import React from "react";
import DashboardClassList from "./DashboardClassList";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<DashboardClassList />);
});
