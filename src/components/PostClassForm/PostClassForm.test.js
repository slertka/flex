import React from "react";
import PostClassForm from "./PostClassForm";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<PostClassForm />);
});

it("calls the handlePostClass callback when the form is submit", () => {
  let cb = jest.fn();
  let wrapper = shallow(<PostClassForm handlePostClass={cb} />);
  wrapper.simulate("submit");
  expect(cb).toHaveBeenCalled();
});

it("calls the cancelPost callback when the cancel button is clicked", () => {
  let cb = jest.fn();
  let wrapper = shallow(<PostClassForm cancelPost={cb} />);
  let cancelButton = wrapper.find("button");
  cancelButton.simulate("click");
  expect(cb).toHaveBeenCalled();
});
