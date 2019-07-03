import React from "react";
import Alert from "./Alert";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Alert />);
});
