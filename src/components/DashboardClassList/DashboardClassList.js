import React from "react";
import { Link, Route } from "react-router-dom";
import "./DashboardClassList.css";

import ClassCard from "../ClassCard/ClassCard";
import PostClassButton from "../PostClassButton/PostClassButton";
import PostClassForm from "../PostClassForm/PostClassForm";

export default function(props) {
  // Create Class Cards
  const classes = props.classes;
  const classList = classes.map(props => <ClassCard {...props} />);

  // Conditional Displays depending on profile type
  const profile = props.profile;
  const header =
    profile === "instructor" ? "Open Positions" : "Your Posted Positions";
  const newClassButton =
    profile === "studio" ? (
      <Link to="/dashboard/post">
        <PostClassButton />
      </Link>
    ) : (
      ""
    );
  const createClass = profile === "studio" ? <PostClassForm /> : "";
  console.log(profile);

  return (
    <section>
      <Route path="/dashboard">
        <h3>{header}</h3>

        {newClassButton}
        <Route
          exact
          path="/dashboard/post"
          render={() => {
            return createClass;
          }}
        />

        <ul>{classList}</ul>
      </Route>
    </section>
  );
}
