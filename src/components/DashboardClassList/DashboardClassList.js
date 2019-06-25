import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import "./DashboardClassList.css";
import AuthContext from "../../context/AuthContext";
import { API_URL } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Animated } from "react-animated-css";

// Components
import ClassCard from "../ClassCard/ClassCard";
import PostClassButton from "../PostClassButton/PostClassButton";
import PostClassForm from "../PostClassForm/PostClassForm";
import EditClassForm from "../EditClassForm/EditClassForm";

export default class DashboardClassList extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      postingClass: false,
      editingClass: false,
      jwtExpired: false,
      openView: true,
      postedClassSuccess: false,
      deleteClassSuccess: false,
      appliedClassSuccess: false,
      withdrawClassSuccess: false,
      classes: [],
      classesApplied: [],
      editClassProps: {}
    };
  }

  // Functions that modify the database / ajax requests
  getClasses = () => {
    // set fetch options
    const jwt = this.context.jwt;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "applicaton/json",
        Authorization: `Bearer ${jwt}`
      }
    };
    const userId = this.context.user ? this.context.user._id : "";

    if (this.context.user) {
      if (this.context.user.type === "instructor") {
        // get classes instructor hasn't yet applied to
        fetch(`${API_URL}/dashboard/classes/${userId}`, options)
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

        // get classes instructor has already applied to
        fetch(`${API_URL}/dashboard/applied/${userId}`, options)
          .then(res => {
            if (!res.ok) {
              return Promise.reject();
            }
            return res.json();
          })
          .then(resj => {
            return this.setState({
              classesApplied: resj
            });
          })
          .catch(() => this.setState({ jwtExpired: true }));
      }

      if (this.context.user.type === "studio") {
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
      datePosted: new Date()
    };

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
        this.getClasses();
        return this.setState({
          postedClassSuccess: true,
          postingClass: false,
          classes: [...this.state.classes, resj]
        });
      })
      .catch(err => {
        this.setState({
          postedClassSuccess: false
        });
        console.log(err);
      });
  };

  applyToClass = classId => {
    const jwt = this.context.jwt;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({ userId: this.context.user._id })
    };

    fetch(`${API_URL}/dashboard/class/apply/${classId}`, options)
      .then(res => {
        return res.json();
      })
      .then(resj => {
        if (resj.code === 422) {
          alert("You already applied for this class!");
        }
        this.getClasses();
        return this.setState({
          appliedClassSuccess: true
        });
      })
      .catch(err => console.log(err));
  };

  withdrawApplication = classId => {
    const jwt = this.context.jwt;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({
        userId: this.context.user._id
      })
    };

    fetch(`${API_URL}/dashboard/class/withdraw/${classId}`, options)
      .then(res => res.json())
      .then(_class => {
        this.getClasses();
        this.setState({
          withdrawClassSuccess: true
        });
      });
  };

  editExistingClass = (e, _id) => {
    e.preventDefault();
    const {
      type,
      length,
      wage,
      classDateDay,
      classDateTime,
      startDate,
      description
    } = e.target;

    const formData = {
      type: type.value,
      length: parseInt(length.value),
      wage: parseInt(wage.value),
      classDateDay: classDateDay.value,
      classDateTime: classDateTime.value,
      startDate: startDate.value,
      description: description.value
    };

    const jwt = this.context.jwt;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(formData)
    };

    fetch(`${API_URL}/dashboard/edit/${_id}`, options)
      .then(res => {
        if (res.code === 422) {
          return Promise.reject("error");
        }
        return res.json();
      })
      .then(_class => {
        this.getClasses();
        return this.setState({
          editingClass: false,
          postingClass: false,
          editClassProps: {}
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteClass = classId => {
    const jwt = this.context.jwt;

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      }
    };

    fetch(`${API_URL}/dashboard/class/${classId}`, options)
      .then(res => res.json())
      .then(() => {
        this.getClasses();
        this.setState({
          deleteClassSuccess: true
        });
      });
  };

  componentDidMount() {
    this.getClasses();
    this.setState({
      postingClass: false,
      editingClass: false
    });
  }

  // Functions to set state & modify the display of the application
  postClass = () => {
    this.setState({
      postingClass: true
    });
  };

  editClass = props => {
    this.setState({
      editingClass: true,
      editClassProps: props
    });
  };

  cancelPost = () => {
    this.setState({
      postingClass: false
    });
  };

  cancelEditing = () => {
    this.setState({
      editingClass: false,
      postingClass: false
    });
  };

  changeView = view => {
    this.setState({
      openView: view
    });
  };

  hideAppliedClassAlert = () => {
    this.setState({
      appliedClassSuccess: false
    });
  };

  hideWithdrawClassAlert = () => {
    this.setState({
      withdrawClassSuccess: false
    });
  };

  hidePostedClassAlert = () => {
    this.setState({
      postedClassSuccess: false
    });
  };

  hideDeletedClassAlert = () => {
    this.setState({
      deleteClassSuccess: false
    });
  };

  render() {
    // Generate ClassCard for open (instructor) or posted (studio) positions
    const classList = this.state.classes.map(props => (
      <ClassCard
        key={props._id}
        profile={this.context.user.type}
        posting={this.state.postingClass}
        deleteClass={() => this.deleteClass(props._id)}
        applyToClass={() => this.applyToClass(props._id)}
        editClass={() => this.editClass(props)}
        {...props}
      />
    ));

    // Generate ClassCard for classes already applied to (instructor)
    const classesAppliedList = this.state.classesApplied.map(props => (
      <ClassCard
        key={props._id}
        profile={this.context.user.type}
        posting={this.state.postingClass}
        applied={true}
        withdrawApplication={() => this.withdrawApplication(props._id)}
        {...props}
      />
    ));

    // Alerts
    const postSuccessAlert = this.state.postedClassSuccess ? (
      <Animated animationInDelay={50}>
        <div className="success-alert">
          Class successfully posted.
          <FontAwesomeIcon
            icon={faTimes}
            onClick={this.hidePostedClassAlert}
            className="exit"
          />
        </div>
      </Animated>
    ) : (
      ""
    );

    const deleteSuccessAlert = this.state.deleteClassSuccess ? (
      <Animated animationInDelay={50}>
        <div className="success-alert">
          Class deleted.
          <FontAwesomeIcon
            icon={faTimes}
            onClick={this.hideDeletedClassAlert}
            className="exit"
          />
        </div>
      </Animated>
    ) : (
      ""
    );

    const appliedSuccessAlert = this.state.appliedClassSuccess ? (
      <Animated animationInDelay={50}>
        <div className="success-alert">
          You have successfully applied.
          <FontAwesomeIcon
            icon={faTimes}
            onClick={this.hideAppliedClassAlert}
            className="exit"
          />
        </div>
      </Animated>
    ) : (
      ""
    );

    const withdrawSuccessAlert = this.state.withdrawClassSuccess ? (
      <Animated animationInDelay={50}>
        <div className="success-alert">
          You have withdrawn your application.
          <FontAwesomeIcon
            icon={faTimes}
            onClick={this.hideWithdrawClassAlert}
            className="exit"
          />
        </div>
      </Animated>
    ) : (
      ""
    );

    // Conditional Displays depending on profile type
    const profile = this.context.user ? this.context.user.type : "";
    // Change header
    const header =
      profile === "instructor" ? "Open Positions" : "Your Posted Positions";

    return (
      <section>
        {this.state.jwtExpired ? <Redirect to="/login" /> : ""}

        <Route path="/dashboard">
          {profile === "studio" && !this.state.editingClass ? (
            <React.Fragment>
              <Link to="/dashboard/post">
                <PostClassButton
                  editing={this.state.postingClass}
                  clickHandler={() => this.postClass()}
                />
              </Link>
              {postSuccessAlert}
              {deleteSuccessAlert}
              <Route
                exact
                path="/dashboard/post"
                render={() => {
                  return (
                    <PostClassForm
                      cancelPost={() => this.cancelPost()}
                      handlePostClass={e => this.createClass(e)}
                    />
                  );
                }}
              />
            </React.Fragment>
          ) : (
            ""
          )}

          {profile === "studio" ? (
            <Route
              exact
              path="/dashboard/edit"
              render={() => {
                return (
                  <EditClassForm
                    cancelEditing={() => this.cancelEditing()}
                    handleEditClass={(e, _id) => this.editExistingClass(e, _id)}
                    {...this.state.editClassProps}
                  />
                );
              }}
            />
          ) : (
            ""
          )}

          {/* buttons implement tabular view */}

          {profile === "instructor" ? (
            <React.Fragment>
              <button onClick={() => this.changeView(true)}>
                Open Positions
              </button>
              <button onClick={() => this.changeView(false)}>
                Pending Applications
              </button>
              {appliedSuccessAlert}
              {withdrawSuccessAlert}
            </React.Fragment>
          ) : (
            ""
          )}
          {/* displays open positions by default */}
          {this.state.openView ? (
            <React.Fragment>
              <h3
                className={
                  this.state.postingClass || this.state.editingClass
                    ? "hidden"
                    : ""
                }
              >
                {header}
              </h3>
              <ul>
                <Route exact path="/dashboard" render={() => classList} />
              </ul>
            </React.Fragment>
          ) : (
            ""
          )}

          {/* displays positions applied for */}
          {profile === "instructor" && !this.state.openView ? (
            <React.Fragment>
              <h3 className={this.state.postingClass ? "hidden" : ""}>
                Pending Applications
              </h3>
              <ul>
                <Route
                  exact
                  path="/dashboard"
                  render={() => classesAppliedList}
                />
              </ul>
            </React.Fragment>
          ) : (
            ""
          )}
        </Route>
      </section>
    );
  }
}
