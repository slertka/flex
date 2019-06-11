// Dependencies
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import { API_URL } from "./config";

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
          {["/", "/about", "/login", "/signup"].map(url => (
            <Route exact path={url} component={Header} key={url} />
          ))}
          <Route exact path="/" component={Details} />
          <Route exact path="/" component={LogInForm} />
          <Route exact path="/" component={Footer} />

          <Route exact path="/about" component={Details} />
          <Route exact path="/about" component={Footer} />

          <Route path="/login" component={LogInForm} />
          <Route path="/login" component={Footer} />

          <Route path="/signup" component={SignUpForm} />
          <Route path="/signup" component={Footer} />

          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </div>
    );
  }
}

export default App;
