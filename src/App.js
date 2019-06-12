// Dependencies
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// import { API_URL } from "./config";

// Components
import Header from "./components/Header/Header";
import Details from "./components/Details/Details";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LogInForm from "./components/LogInForm/LogInForm";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

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

          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </div>
    );
  }
}

export default App;
