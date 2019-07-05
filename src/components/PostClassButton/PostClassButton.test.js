import React from "react";
import PostClassButton from "./PostClassButton";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<PostClassButton />);
});

it("fires the clickHandler callback when the button is clicked", () => {
  const cb = jest.fn();
  const wrapper = shallow(<PostClassButton clickHandler={cb} />);
  wrapper.simulate("click");
  expect(cb).toHaveBeenCalled();
});
