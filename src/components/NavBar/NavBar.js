import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

export default class NavBar extends React.Component {
  state = {
    displayLinks: false
  };

  toggleClass = () => {
    this.setState({
      displayLinks: !this.state.displayLinks
    });
  };

  render() {
    return (
      <header className="nav-bar">
        <div />
        <div>
          <FontAwesomeIcon
            icon={faBars}
            className="nav-icon fa-2x"
            onClick={this.toggleClass}
          />
        </div>
        <div className={this.state.displayLinks ? "" : "hidden"}>
          <ul>
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/login">Log In</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
