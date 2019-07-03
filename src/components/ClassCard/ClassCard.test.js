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
  userApplied: []
};

it("renders without crashing", () => {
  shallow(<ClassCard {...props} />);
});
