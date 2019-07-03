import React from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { API_URL } from "../../config";

import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardClassList from "../DashboardClassList/DashboardClassList";

export class Dashboard extends React.Component {
  static contextType = AuthContext;

  refreshAuthToken = jwt => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };
    fetch(`${API_URL}/user/auth/refresh`, options)
      .then(res => {
        if (!res.ok) {
          return Promise.reject;
        }
        return res.json();
      })
      .then(resj => {
        this.context.setJwt(resj.jwt);
      });
  };

  componentDidMount() {
    setInterval(this.refreshAuthToken(this.context.jwt), 1800000);
  }

  render() {
    return (
      <div>
        <AuthContext.Consumer>
          {value => {
            return (
              <React.Fragment>
                {!value.jwt ? <Redirect to="/login" /> : ""}
                <DashboardHeader />
                <DashboardClassList {...this.props} />
              </React.Fragment>
            );
          }}
        </AuthContext.Consumer>
      </div>
    );
  }
}

export default Dashboard;
