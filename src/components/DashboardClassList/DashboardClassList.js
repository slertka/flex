import React from "react";
import { Link, Route } from "react-router-dom";
import "./DashboardClassList.css";
import AuthContext from "../../context/AuthContext";
import { API_URL } from "../../config";

// Components
import ClassCard from "../ClassCard/ClassCard";
import PostClassButton from "../PostClassButton/PostClassButton";
import PostClassForm from "../PostClassForm/PostClassForm";

export default class DashboardClassList extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      postingClass: false,
      classes: []
    };
  }

  componentDidMount() {
    // set fetch options
    const jwt = this.context.jwt;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    if (this.context.type === "instructor") {
      fetch(`${API_URL}/dashboard/classes`, options)
        .then(res => {
          return res.json();
        })
        .then(resj => {
          return this.setState({
            classes: resj
          });
        })
        .catch(err => console.log(err));
    }

    if (this.context.type === "studio") {
      const userId = this.context._id;
      console.log(userId);
      fetch(`${API_URL}/dashboard/${userId}`, options)
        .then(res => res.json())
        .then(resj =>
          this.setState({
            classes: resj
          })
        );
    }
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
    const classes = this.state.classes;
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
