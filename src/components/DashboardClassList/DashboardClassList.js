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
      classes: [],
      user: {
        firstName: "",
        _id: null
      }
    };
  }

  getClasses = () => {
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
      fetch(`${API_URL}/dashboard/studio/${userId}`, options)
        .then(res => res.json())
        .then(resj =>
          this.setState({
            classes: resj
          })
        );
    }
  };

  componentDidMount() {
    this.getClasses();
    this.setState({
      postingClass: false,
      user: {
        type: this.context.type,
        _id: this.context._id
      }
    });
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
    console.log(this.context);
    // Create Class Cards
    const classes = this.state.classes;
    const classList = classes.map(props => (
      <ClassCard
        key={props._id}
        profile={this.context.type}
        posting={this.state.postingClass}
        {...props}
      />
    ));

    // Conditional Displays depending on profile type
    const profile = this.state.user.type;
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
      <AuthContext.Consumer>
        {value => (
          <section>
            <Route path="/dashboard">
              <h3 className={this.state.postingClass ? "hidden" : ""}>
                {header}
              </h3>

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
        )}
      </AuthContext.Consumer>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user.type !== this.state.user.type) {
      console.log("user updated");
    }
    if (prevState.classes !== this.state.classes) {
      console.log(prevState.classes);
      console.log(this.state.classes);
      this.setState({
        postingClass: false
      });
    }
  }
}
