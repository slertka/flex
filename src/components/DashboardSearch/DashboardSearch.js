import React from "react";
import AuthContext from "../../context/AuthContext";

export default class DashboardSearch extends React.Component {
  static contextType = AuthContext;

  render() {
    const profile = this.context.user ? this.context.user.type : "";
    return (
      <React.Fragment>
        {profile === "instructor" ? (
          <section>
            <label htmlFor="search">
              <h3>Find an Open Class</h3>
            </label>
            [search location, search by studio name, search by class type]
            <input type="text" name="search" />
            <input type="submit" />
          </section>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
