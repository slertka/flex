// Dependencies
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

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
          <Route exact path="/" component={Header} />
          <Route exact path="/" component={Details} />
          <Route exact path="/" component={SignUpForm} />
          <Route exact path="/" component={Footer} />

          <Route exact path="/about" component={Header} />
          <Route exact path="/about" component={Details} />
          <Route exact path="/about" component={Footer} />

          <Route path="/login" component={Header} />
          <Route path="/login" component={LogInForm} />
          <Route path="/login" component={Footer} />

          <Route path="/signup" component={Header} />
          <Route path="/signup" component={SignUpForm} />
          <Route path="/signup" component={Footer} />

          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </div>
    );
  }
}

export default App;
