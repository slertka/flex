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
            <form onSubmit={this.props.setFilterParams}>
              <h3>Filter Open Classes</h3>
              <div>
                <label htmlFor="type">Type of Yoga: </label>
                <select name="type">
                  <option value="all">All</option>
                  <option value="open">Open Format</option>
                  <option value="vinyasa">Vinyasa</option>
                  <option value="hatha">Hatha</option>
                  <option value="yin">Yin</option>
                  <option value="bikram">Bikram</option>
                  <option value="prenatal">Pre-natal</option>
                  <option value="sculpt">Yoga Sculpt</option>
                </select>
              </div>
              <div>
                <label>Class Day:</label>
                <input name="monday" type="checkbox" value="monday" />
                Monday
                <br />
                <input name="tuesday" type="checkbox" value="tuesday" />
                Tuesday
                <br />
                <input name="wednesday" type="checkbox" value="wednesday" />
                Wednesday
                <br />
                <input name="thursday" type="checkbox" value="thursday" />
                Thursday
                <br />
                <input name="friday" type="checkbox" value="friday" />
                Friday
                <br />
                <input name="saturday" type="checkbox" value="saturday" />
                Saturday
                <br />
                <input name="sunday" type="checkbox" value="sunday" />
                Sunday
                <br />
              </div>
              <input type="submit" value="Search" />
              <button onClick={this.props.resetFilterParams}>Reset</button>
            </form>
          </section>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
