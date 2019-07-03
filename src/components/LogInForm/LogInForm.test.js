import React from "react";
import LogInForm from "./LogInForm";
import { shallow, mount } from "enzyme";

it("renders without crashing", () => {
  shallow(<LogInForm />);
});

// it("should fire the loginUser callback when the form is submitted", () => {
//   const cb = jest.fn();
//   const wrapper = mount(<LogInForm />);
//   wrapper.simulate("submit");
//   expect(cb).toHaveBeenCalled();
// });
