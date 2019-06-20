import React from "react";
import "./ClassCard.css";

export default class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  // Display time as AM/PM format rather than military
  convertTime = time => {
    let timeDisplay;
    let hour = parseInt(time.substring(0, 2));
    let min = time.substring(3, 5);

    if (hour === 12) {
      timeDisplay = `${hour}:${min} PM`;
    } else if (hour > 12) {
      timeDisplay = `${-(12 - hour)}:${min} PM`;
    } else {
      timeDisplay = `${hour}:${min} AM`;
    }

    return timeDisplay;
  };

  convertDate = date => {
    let year = date.substring(0, 4);
    let month;
    switch (date.substring(5, 7)) {
      case "01":
        month = "January";
        break;
      case "02":
        month = "February";
        break;
      case "03":
        month = "March";
        break;
      case "04":
        month = "April";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "June";
        break;
      case "07":
        month = "July";
        break;
      case "08":
        month = "August";
        break;
      case "09":
        month = "September";
        break;
      case "10":
        month = "October";
        break;
      case "11":
        month = "November";
        break;
      case "12":
        month = "December";
        break;
      default:
        month = "";
    }
    let day = date.substring(8, 10);
    return `${month} ${day}, ${year}`;
  };

  render() {
    const profile = this.props.profile;
    const applyButton =
      profile === "instructor" ? (
        <button
          name="apply"
          className="apply-button"
          onClick={this.props.applyToClass}
        >
          <label htmlFor="apply">Click to Apply</label>
        </button>
      ) : (
        ""
      );

    const deleteButton =
      profile === "studio" ? (
        <button
          name="delete"
          className="delete-button"
          onClick={this.props.deleteClass}
        >
          Delete Listing
        </button>
      ) : (
        ""
      );

    let yogaType;
    switch (this.props.type) {
      case "open":
        yogaType = "Open Format Yoga";
        break;
      case "prenatal":
        yogaType = "Pre-Natal Yoga";
        break;
      case "sculpt":
        yogaType = "Yoga Sculpt";
        break;
      default:
        yogaType = `${this.props.type.charAt(0).toUpperCase() +
          this.props.type.slice(1)} Yoga`;
    }

    const applicants = this.props.userApplied.map(user => (
      <li key={user._id}>
        Name: {user.firstName} {user.lastName}, Email:{" "}
        <a href={`mailto: ${user.email}`}>{user.email}</a>
      </li>
    ));

    return (
      <li
        className={
          this.props.posting ? "hidden open-position" : "open-position"
        }
      >
        {applyButton}
        {deleteButton}

        {profile === "instructor" && this.props.description === "" ? (
          ""
        ) : (
          <button name="expand" onClick={e => this.handleExpand(e)}>
            {this.state.expanded ? "Hide" : "Expand"}
          </button>
        )}

        <h4>{yogaType}</h4>
        <h5>{profile === "instructor" ? this.props.postedBy.studio : ""}</h5>
        <h5>
          {this.props.classDateDay.charAt(0).toUpperCase() +
            this.props.classDateDay.slice(1)}
          s @ {this.convertTime(this.props.classDateTime)}
        </h5>
        <h5>Start Date: {this.convertDate(this.props.startDate)}</h5>
        {profile === "studio" ? (
          <h5>Number of Applicants: {this.props.userApplied.length}</h5>
        ) : (
          ""
        )}
        <h5>${this.props.wage}/hour</h5>
        <div className={!this.state.expanded ? "hidden" : ""}>
          <h6>{this.props.description}</h6>
          {""}
          {profile === "studio" && this.props.userApplied.length > 0 ? (
            <ul>
              Applicants:
              {applicants}
            </ul>
          ) : (
            ""
          )}
        </div>
      </li>
    );
  }
}
