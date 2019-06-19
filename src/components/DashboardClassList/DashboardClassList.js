import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
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
      postedClassSuccess: false,
      classes: [],
      jwtExpired: false
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

    if (this.context.user.type === "instructor") {
      fetch(`${API_URL}/dashboard/classes`, options)
        .then(res => {
          if (!res.ok) {
            return Promise.reject("error");
          }
          return res.json();
        })
        .then(resj => {
          return this.setState({
            classes: resj
          });
        })
        .catch(() => this.setState({ jwtExpired: true }));
    }

    if (this.context.user.type === "studio") {
      const userId = this.context.user._id;
      console.log(userId);
      fetch(`${API_URL}/dashboard/studio/${userId}`, options)
        .then(res => {
          if (!res.ok) {
            return Promise.reject("error");
          }
          return res.json();
        })
        .then(resj =>
          this.setState({
            classes: resj
          })
        )
        .catch(() => this.setState({ jwtExpired: true }));
    }
  };

  createClass = e => {
    e.preventDefault();

    // pull data from form inputs
    const {
      type,
      length,
      wage,
      classDateDay,
      classDateTime,
      startDate,
      description
    } = e.target;

    // create form data object
    const formData = {
      type: type.value,
      length: parseInt(length.value),
      wage: parseInt(wage.value),
      classDateDay: classDateDay.value,
      classDateTime: classDateTime.value,
      startDate: startDate.value,
      description: description.value,
      postedBy: this.context.user._id,
      datePosted: new Date()
    };
    console.log(formData);

    // get JWT from context
    const jwt = this.context.jwt;

    // set fetch options
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(formData)
    };

    // fetch request to POST/create new class
    fetch(`${API_URL}/dashboard/postClass`, options)
      .then(res => {
        if (res.status === 422 || !res.ok) {
          return this.setState({
            classPostedSuccess: false
          });
        }
        return res.json();
      })
      .then(resj => {
        // console.log(resj);
        this.props.history.push("/dashboard");
        return this.setState({
          classPostedSuccess: true,
          postingClass: false,
          classes: [...this.state.classes, resj]
        });
      })
      .catch(err => {
        this.setState({
          classPostedSuccess: false
        });
        console.log(err);
      });
  };

  componentDidMount() {
    this.getClasses();
    this.setState({
      postingClass: false
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
    // Create Class Cards
    const classList = this.state.classes.map(props => (
      <ClassCard
        key={props._id}
        profile={this.context.user.type}
        posting={this.state.postingClass}
        {...props}
      />
    ));

    // Conditional Displays depending on profile type
    const profile = this.context.user.type;
    // Change header
    const header =
      profile === "instructor" ? "Open Positions" : "Your Posted Positions";

    return (
      <section>
        {this.state.jwtExpired ? <Redirect to="/login" /> : ""}

        <Route path="/dashboard">
          <h3 className={this.state.postingClass ? "hidden" : ""}>{header}</h3>

          {profile === "studio" ? (
            <>
              <Link to="/dashboard/post">
                <PostClassButton
                  editing={this.state.postingClass}
                  clickHandler={e => this.postClass(e)}
                />
              </Link>
              <Route
                exact
                path="/dashboard/post"
                render={props => {
                  return (
                    <PostClassForm
                      cancelPost={e => this.cancelPost(e)}
                      handlePostClass={e => this.createClass(e)}
                    />
                  );
                }}
              />
            </>
          ) : (
            ""
          )}

          <ul>
            <Route exact path="/dashboard" render={() => classList} />
          </ul>
        </Route>
      </section>
    );
  }
}
