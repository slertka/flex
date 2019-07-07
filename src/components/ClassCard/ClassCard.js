import React from "react";
import { Link } from "react-router-dom";
import "./ClassCard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      editingPost: false,
      expandOpts: false
    };
  }

  handleExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
      expandOpts: false
    });
  };

  expandOpts = () => {
    this.setState({
      expandOpts: !this.state.expandOpts
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

  // Display date as Month DD, YYYY
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

    const seeMore = (
      <button
        name="expand"
        className="seemore-button expand-opt"
        onClick={this.handleExpand}
      >
        <label for="expand">
          {this.state.expanded ? "See Less" : "See More"}
        </label>
      </button>
    );

    const applyButton =
      profile === "instructor" ? (
        <button
          name="apply"
          onClick={this.props.applyToClass}
          className={
            this.props.applied
              ? "hidden apply-button expand-opt"
              : "apply-button expand-opt"
          }
        >
          <label htmlFor="apply">Click to Apply</label>
        </button>
      ) : (
        ""
      );

    const editButton =
      profile === "studio" ? (
        <Link to="/dashboard/edit">
          <button
            onClick={this.props.editClass}
            className="edit-button expand-opt"
            name="edit"
          >
            <label for="edit">Edit Listing</label>
          </button>
        </Link>
      ) : (
        ""
      );

    const deleteButton =
      profile === "studio" ? (
        <button
          name="delete"
          className="delete-button expand-opt"
          onClick={this.props.deleteClass}
        >
          <label for="delete">Delete Listing</label>
        </button>
      ) : (
        ""
      );

    const withdrawAppButton = this.props.applied ? (
      <button
        onClick={this.props.withdrawApplication}
        className="withdraw-button expand-opt"
      >
        Withdraw
      </button>
    ) : (
      ""
    );

    let yogaAbr;
    switch (this.props.type) {
      case "open":
        yogaAbr = "OF";
        break;
      case "prenatal":
        yogaAbr = "P";
        break;
      case "sculpt":
        yogaAbr = "YS";
        break;
      case "vinyasa":
        yogaAbr = "V";
        break;
      case "hatha":
        yogaAbr = "H";
        break;
      case "bikram":
        yogaAbr = "B";
        break;
      default:
        yogaAbr = "Y";
    }

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
        <div className="applicant">
          <h6 className="applicant-name">
            {user.firstName} {user.lastName}
          </h6>

          <a href={`mailto: ${user.email}`} className="contact">
            Contact
          </a>
        </div>
      </li>
    ));

    return (
      <li
        className={
          this.props.posting ? "hidden open-position" : "open-position"
        }
      >
        <div className="yoga-pic">{yogaAbr}</div>

        <div className="class-mods">
          <FontAwesomeIcon
            icon={faEllipsisH}
            className="expand-icon"
            onClick={() => this.expandOpts()}
          />
          <div
            className={
              this.state.expandOpts ? "expand-opts" : "expand-opts hidden"
            }
          >
            {seeMore}
            {applyButton}
            {editButton}
            {deleteButton}
            {withdrawAppButton}
          </div>
        </div>

        <div className="class-header">
          <h4 className="class-type">{yogaType}</h4>

          {profile === "instructor" ? (
            <h5 className="class-studio">
              <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
              {this.props.postedBy.studio}
            </h5>
          ) : (
            ""
          )}

          <h5 className="class-duration">{this.props.length} minutes</h5>

          <h5 className="class-date">
            {this.props.classDateDay.charAt(0).toUpperCase() +
              this.props.classDateDay.slice(1)}
            s @ {this.convertTime(this.props.classDateTime)}
          </h5>

          <h5 className="class-wage">${this.props.wage}/hour</h5>

          <h5 className="class-responses">
            {this.props.userApplied.length} response
            {this.props.userApplied.length === 1 ? "" : "s"}
          </h5>
        </div>

        <div
          className={
            !this.state.expanded ? "hidden expanded-info " : "expanded-info"
          }
        >
          <h5 className="class-startDate">
            Available starting {this.convertDate(this.props.startDate)}
          </h5>

          <h6 className="class-description">{this.props.description}</h6>

          {profile === "studio" && this.props.userApplied.length > 0 ? (
            <ul className="applicant-list">
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
