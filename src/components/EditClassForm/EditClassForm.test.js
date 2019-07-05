import React from "react";
import EditClassForm from "./EditClassForm";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<EditClassForm />);
});

it("fires the handleEditClass callback when the form is submit", () => {
  let cb = jest.fn();
  let wrapper = shallow(<EditClassForm handleEditClass={cb} />);
  wrapper.simulate("submit");
  expect(cb).toHaveBeenCalled();
});

it("fires the cancelEditing callback when the cancel button is clicked", () => {
  let cb = jest.fn();
  let wrapper = shallow(<EditClassForm cancelEditing={cb} />);
  let cancelEditButton = wrapper.find(".cancel-edit");
  cancelEditButton.simulate("click");
  expect(cb).toHaveBeenCalled();
});
