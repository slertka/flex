import React from "react";
import ClassCard from "./ClassCard";
import { shallow } from "enzyme";

const props = {
  description: "",
  wage: 25,
  length: 60,
  type: "vinyasa",
  classDateDay: "monday",
  classDateTime: "16:00",
  startDate: "2019-06-24T00:00:00.000Z",
  userApplied: [],
  postedBy: {
    studio: "test studio"
  }
};

it("renders without crashing", () => {
  shallow(<ClassCard {...props} />);
});

it("renders the apply button when the profile is an instructor", () => {
  let wrapper = shallow(<ClassCard {...props} profile="instructor" />);
  let applyButton = wrapper.find(".apply-button");
  expect(applyButton).not.toEqual(null);
});

it("fires the applyToClass callback when the apply button is clicked", () => {
  let cb = jest.fn();
  let wrapper = shallow(
    <ClassCard {...props} profile="instructor" applyToClass={cb} />
  );
  let applyButton = wrapper.find(".apply-button");
  applyButton.simulate("click");
  expect(cb).toHaveBeenCalled();
});

it("renders the edit button when the profile is a studio", () => {
  let wrapper = shallow(<ClassCard {...props} profile="studio" />);
  let editButton = wrapper.find(".edit-button");
  expect(editButton).not.toEqual(null);
});

it("fires the editClass callback when the edit button is clicked", () => {
  let cb = jest.fn();
  let wrapper = shallow(
    <ClassCard {...props} profile="studio" editClass={cb} />
  );
  let editButton = wrapper.find(".edit-button");
  editButton.simulate("click");
  expect(cb).toHaveBeenCalled();
});

it("renders the delete button when the profile is a studio", () => {
  let wrapper = shallow(<ClassCard {...props} profile="studio" />);
  let deleteButton = wrapper.find(".delete-button");
  expect(deleteButton).not.toEqual(null);
});

it("fires the deleteClass cb when the delete button is clicked", () => {
  let cb = jest.fn();
  let wrapper = shallow(
    <ClassCard {...props} profile="studio" deleteClass={cb} />
  );
  let deleteButton = wrapper.find(".delete-button");
  deleteButton.simulate("click");
  expect(cb).toHaveBeenCalled();
});

it("renders the withdraw button if an instructor has applied", () => {
  let wrapper = shallow(<ClassCard {...props} applied={true} />);
  let withdrawButton = wrapper.find(".withdraw-button");
  expect(withdrawButton).not.toEqual(null);
});

it("fires the withdrawApplication callback when the withdraw button is clicked", () => {
  let cb = jest.fn();
  let wrapper = shallow(
    <ClassCard {...props} applied={true} withdrawApplication={cb} />
  );
  let withdrawButton = wrapper.find(".withdraw-button");
  withdrawButton.simulate("click");
  expect(cb).toHaveBeenCalled();
});
