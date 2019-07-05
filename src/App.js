// Dependencies
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// Context
import AuthContext from "./context/AuthContext";

// Components
import Header from "./components/Header/Header";
import Details from "./components/Details/Details";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LogInForm from "./components/LogInForm/LogInForm";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends React.Component {
  static contextType = AuthContext;

  state = {
    jwt: localStorage.getItem("jwt"),
    user: JSON.parse(localStorage.getItem("user"))
  };

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

  render() {
    const contextValue = {
      jwt: this.state.jwt,
      user: this.state.user,
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

            <Route path="/login" component={LogInForm} />

            <Route path="/signup" component={SignUpForm} />

            <Route path="/dashboard" component={Dashboard} />
          </Router>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
