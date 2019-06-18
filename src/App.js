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
      jwt: localStorage.getItem("jwt") || "",
      user: localStorage.getItem("user") || {
        _id: "",
        firstName: "",
        type: ""
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

  render() {
    const contextValue = {
      jwt: this.state.jwt,
      firstName: this.state.user.firstName,
      type: this.state.user.type,
      userId: this.state.user._id,
      setJwt: this.setJwt,
      setAuthUser: this.setAuthUser
    };

    return (
      <div className="App">
        <AuthContext.Provider value={contextValue}>
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
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
