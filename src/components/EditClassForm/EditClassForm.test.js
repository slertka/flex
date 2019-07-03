import React from "react";
import EditClassForm from "./EditClassForm";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<EditClassForm />);
});
