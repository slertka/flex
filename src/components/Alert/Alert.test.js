import React from "react";
import Alert from "./Alert";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Alert />);
});

it("executes handleAlert callback when clicked", () => {
  let cb = jest.fn();
  let wrapper = shallow(<Alert handleAlert={cb} />);
  let icon = wrapper.find(".exit");
  icon.simulate("click");
  expect(cb).toHaveBeenCalled();
});
