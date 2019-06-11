import React from "react";
import "./ClassCard.css";

export default class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleExpand = e => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const applyButton =
      this.props.profile === "instructor" ? (
        <button name="apply" className="apply-button">
          <label htmlFor="apply">Click to Apply</label>
        </button>
      ) : (
        ""
      );

    return (
      <li
        className={
          this.props.posting ? "hidden open-position" : "open-position"
        }
      >
        {applyButton}
        <button name="expand" onClick={e => this.handleExpand(e)}>
          {this.state.expanded ? "Hide" : "Expand"}
        </button>
        <h4>{this.props.type} yoga</h4>
        <h5>
          {this.props.classDateDay}s @ {this.props.classDateTime}
        </h5>
        <h5>{this.props.studio} [link to studio page]</h5>
        <div className={!this.state.expanded ? "hidden" : ""}>
          <p>${this.props.wage}/hour</p>
          <p>{this.props.description}</p>
        </div>
      </li>
    );
  }
}
