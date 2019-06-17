// Dependencies
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// Context
import AuthContext from "./context/AuthContext";
import { API_URL } from "./config";

// Components
import Header from "./components/Header/Header";
import Details from "./components/Details/Details";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LogInForm from "./components/LogInForm/LogInForm";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      jwt: "",
      user: {
        firstName: "",
        type: "",
        _id: ""
      }
    };
  }

  setJwt = jwt => {
    this.setState({
      jwt
    });
  };

  setAuthUser = user => {
    this.setState({
      user: {
        firstName: user.firstName,
        _id: user._id,
        type: user.type
      }
    });
  };

  // refreshAuthToken = () => {
  //   const jwt = this.context.jwt;
  //   // return fetch(`${API_URL}/user/aauthRefresh`).
  // }

  createUser = e => {
    e.preventDefault();
    const {
      type,
      studio,
      firstName,
      lastName,
      email,
      password,
      confirmPass
    } = e.target;

    const userInfo = {
      type: type.value,
      studio: studio.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPass: confirmPass.value
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    };

    fetch(`${API_URL}/user/signup`, options)
      .then(res => {
        if (res.status === 422) {
          return Promise.reject(res.body);
        }
        return res.json();
      })
      .then(resj => {
        // Store user data in local storage
        localStorage.setItem("jwt", resj.jwt);
        localStorage.setItem("user", JSON.stringify(resj.user));
        // Store JWT in state
        this.context.setJwt(resj.jwt);
        // Store AuthUser in state
        this.context.setAuthUser(resj.user);
        // React Router push to /dashboard
        console.log(this.context);
        // this.props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
        // highlight fields that have an error?
      });
  };

  render() {
    const contextValue = {
      firstName: this.state.user.firstName,
      setJwt: this.setJwt,
      setAuthUser: this.setAuthUser,
      type: this.state.user.type,
      _id: this.state.user._id,
      jwt: this.state.jwt,
      refreshAuthToken: this.refreshAuthToken,
      createUser: this.createUser
    };

    return (
      <AuthContext.Provider value={contextValue}>
        <div className="App">
          <Router>
            {["/", "/about", "/login", "/signup"].map(path => (
              <Route exact path={path} component={Header} key={path} />
            ))}
            <Route exact path="/" component={Details} />
            <Route exact path="/" component={LogInForm} />

            <Route exact path="/about" component={Details} />

            <Route path="/login" component={LogInForm} />

            <Route path="/signup" component={SignUpForm} />

            {["/", "/about", "/login", "/signup"].map(path => (
              <Route exact path={path} component={Footer} key={path} />
            ))}

            <Route path="/dashboard" component={Dashboard} />
          </Router>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
