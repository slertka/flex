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

  componentDidMount() {
    // if (localStorage.getItem("jwt")) {
    //   console.log("storing local jwt in state");
    //   this.setJwt(localStorage.getItem("jwt"));
    // }
    // if (localStorage.getItem("user")) {
    //   console.log("storing local user in state");
    //   this.setAuthUser(JSON.parse(localStorage.getItem("user")));
    // }
  }

  // refreshAuthToken = () => {
  //   const jwt = this.context.jwt;
  //   // return fetch(`${API_URL}/user/aauthRefresh`).
  // }

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
