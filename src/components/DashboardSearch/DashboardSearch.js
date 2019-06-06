import React from "react";

export default class DashboardSearch extends React.Component {
  render() {
    return (
      <section>
        <label for="search">
          <h3>Search</h3>
        </label>
        [search location, search by studio name, search by class type]
        <input type="text" name="search" />
        <input type="submit" />
      </section>
    );
  }
}
