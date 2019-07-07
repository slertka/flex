import React from "react";
import AuthContext from "../../context/AuthContext";
import "./DashboardSearch.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default class DashboardSearch extends React.Component {
  static contextType = AuthContext;

  state = {
    displayFilter: false
  };

  toggleDisplay = () => {
    this.setState({
      displayFilter: !this.state.displayFilter
    });
  };

  render() {
    const profile = this.context.user ? this.context.user.type : "";
    return (
      <React.Fragment>
        {profile === "instructor" ? (
          <div>
            <div onClick={this.toggleDisplay} className="search-header">
              <h3>
                Filter <FontAwesomeIcon icon={faCaretDown} />
              </h3>
            </div>
            <form
              onSubmit={this.props.setFilterParams}
              className={this.state.displayFilter ? "search" : "hidden search"}
            >
              <div>
                <label htmlFor="type">Type of Yoga: </label>
                <select name="type" className="select-yoga">
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
                <br />
                <div className="day-check">
                  <input name="monday" type="checkbox" value="monday" />
                  <label htmlFor="monday">Monday</label>
                  <br />
                  <input name="tuesday" type="checkbox" value="tuesday" />
                  <label htmlFor="tuesday">Tuesday</label>
                  <br />
                  <input name="wednesday" type="checkbox" value="wednesday" />
                  <label htmlFor="wednesday">Wednesday</label>
                  <br />
                  <input name="thursday" type="checkbox" value="thursday" />
                  <label htmlFor="thursday">Thursday</label>

                  <br />
                  <input name="friday" type="checkbox" value="friday" />
                  <label htmlFor="friday">Friday</label>

                  <br />
                  <input name="saturday" type="checkbox" value="saturday" />
                  <label htmlFor="saturday">Saturday</label>

                  <br />
                  <input name="sunday" type="checkbox" value="sunday" />
                  <label htmlFor="sunday">Sunday</label>

                  <br />
                </div>
              </div>
              <input type="submit" value="Search" />
              <button
                className="reset-filter-button"
                onClick={this.props.resetFilterParams}
              >
                Reset
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
