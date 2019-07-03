import React from "react";
import PostClassForm from "./PostClassForm";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<PostClassForm />);
});
