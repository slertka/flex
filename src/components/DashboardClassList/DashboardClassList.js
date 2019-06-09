import React from "react";
import { Link, Route } from "react-router-dom";
import "./DashboardClassList.css";

import ClassCard from "../ClassCard/ClassCard";
import PostClassButton from "../PostClassButton/PostClassButton";
import PostClassForm from "../PostClassForm/PostClassForm";

export default class DashboardClassList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postingClass: false
    };
  }

  postClass(e) {
    this.setState({
      postingClass: true
    });
  }

  cancelPost(e) {
    this.setState({
      postingClass: false
    });
  }

  render() {
    // Create Class Cards
    const classes = this.props.classes;
    const classList = classes.map(props => (
      <ClassCard key={props.id} {...props} posting={this.state.postingClass} />
    ));

    // Conditional Displays depending on profile type
    const profile = this.props.profile;
    const header =
      profile === "instructor" ? "Open Positions" : "Your Posted Positions";
    const newClassButton =
      profile === "studio" ? (
        <Link to="/dashboard/post">
          <PostClassButton
            editing={this.state.postingClass}
            clickHandler={e => this.postClass(e)}
          />
        </Link>
      ) : (
        ""
      );
    const createClass =
      profile === "studio" ? (
        <PostClassForm cancelPost={e => this.cancelPost(e)} />
      ) : (
        ""
      );

    return (
      <section>
        <Route path="/dashboard">
          <h3 className={this.state.postingClass ? "hidden" : ""}>{header}</h3>

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
}
