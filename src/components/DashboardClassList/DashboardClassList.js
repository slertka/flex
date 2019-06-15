import React from "react";
import { Link, Route } from "react-router-dom";
import "./DashboardClassList.css";

import ClassCard from "../ClassCard/ClassCard";
import PostClassButton from "../PostClassButton/PostClassButton";
import PostClassForm from "../PostClassForm/PostClassForm";

import AuthContext from "../../context/AuthContext";

const SAMPLE_DATA = {
  classes: [
    {
      id: 1,
      type: "vinyasa",
      wage: 35,
      length: 60,
      studio: "Flow & Joe",
      startDate: new Date(2019, 6, 15),
      classDateDay: "Monday",
      classDateTime: "17:30",
      description:
        "Officia nisi dolore ex consectetur duis velit minim ex duis et voluptate labore. Voluptate ullamco laboris nulla ea occaecat irure ad Lorem irure nulla Lorem nostrud minim. Duis quis adipisicing amet sit fugiat esse nisi et minim aute."
    },
    {
      id: 2,
      type: "hatha",
      wage: 35,
      length: 75,
      studio: "Corepower Yoga",
      startDate: new Date(2019, 6, 12),
      classDateDay: "Wednesday",
      classDateTime: "18:30",
      description:
        "Minim sint qui ipsum et duis consequat dolor reprehenderit mollit. Incididunt ex tempor exercitation reprehenderit consequat elit anim. Qui amet deserunt ullamco sint voluptate. Est velit veniam amet consequat minim culpa do exercitation officia et exercitation in."
    }
  ]
};

export default class DashboardClassList extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      postingClass: false
    };
  }

  // utilize component did mount to make fetch request for class data associated with the user if type=studio

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
    const classes = SAMPLE_DATA.classes;
    const classList = classes.map(props => (
      <ClassCard
        key={props.id}
        profile={this.props.profile}
        {...props}
        posting={this.state.postingClass}
      />
    ));

    // Conditional Displays depending on profile type
    const profile = this.context.type;
    const header =
      profile === "instructor" ? "Open Positions" : "Your Posted Positions";
    const deleteClassButton =
      profile === "studio" ? <button>Delete</button> : "";
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
          {deleteClassButton}

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
