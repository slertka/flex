import React from "react";
import SignUpForm from "./SignUpForm";
import { shallow } from "enzyme";

it("should render without crashing", () => {
  shallow(<SignUpForm />);
});
