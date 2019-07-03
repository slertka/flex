import React from "react";
import Details from "./Details";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Details />);
});
