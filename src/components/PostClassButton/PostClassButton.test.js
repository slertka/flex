import React from "react";
import PostClassButton from "./PostClassButton";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<PostClassButton />);
});
