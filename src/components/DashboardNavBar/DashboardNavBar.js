import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./DashboardNavBar.css";

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
      <header className="dash-nav-bar" onClick={this.toggleClass}>
        <div />
        <div>
          <FontAwesomeIcon icon={faBars} className="dash-nav-icon" />
        </div>
        <div className={this.state.displayLinks ? "" : "hidden"}>
          <ul>
            {this.props.profile === "studio" ? (
              <li className="dash-nav-item">
                <Link to="/dashboard/post" onClick={this.toggleClass}>
                  Post Class
                </Link>
              </li>
            ) : (
              ""
            )}

            <li className="dash-nav-item">
              <Link to="/" onClick={this.props.logOutUser}>
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
