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
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends React.Component {
  static contextType = AuthContext;

  setJwt = jwt => {
    this.setState({
      jwt
    });
  };

  setAuthUser = user => {
    this.setState({
      user: {
        firstName: user.firstName,
        id: user._id,
        type: user.type
      }
    });
  };

  render() {
    const contextValue = {
      firstName: this.context.user.firstName,
      setJwt: this.setJwt,
      setAuthUser: this.setAuthUser,
      type: this.context.user.type,
      _id: this.context.user._id,
      jwt: this.context.jwt
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
