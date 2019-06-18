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
    jwt: null,
    user: {
      _id: "",
      firstName: "",
      type: "",
      ...user
    }
  };

  setJwt = jwt => {
    // set JWT if already stored in localStorage
    const authToken = localStorage.getItem("jwt") || "";

    // assign JWT to state
    this.setState({
      jwt: authToken || jwt
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
    return (
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

<<<<<<< HEAD
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </div>
=======
            <Route
              path={{
                pathname: "/dashboard",
                state: { user: this.state.user, jwt: this.state.jwt }
              }}
              component={Dashboard}
            />
          </Router>
        </div>
      </AuthContext.Provider>
>>>>>>> master
    );
  }
}

export default App;
