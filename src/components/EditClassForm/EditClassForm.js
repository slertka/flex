import React from "react";
import { Link, Redirect } from "react-router-dom";

import "./EditClassForm.css";

export default class EditClassForm extends React.Component {
  render() {
    const date = this.props.startDate
      ? this.props.startDate.substring(0, 10)
      : "";
    return (
      <form
        onSubmit={e => this.props.handleEditClass(e, this.props._id)}
        className="edit-class-form"
      >
        {!this.props.type ? <Redirect to="/dashboard" /> : ""}
        <h3>Edit Class</h3>
        <div>
          <select name="type" defaultValue={this.props.type}>
            <option value="">Select Class Format</option>
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
          <label htmlFor="length">Class Length</label>
          <input type="number" name="length" defaultValue={this.props.length} />
        </div>
        <div>
          <label htmlFor="wage">Hourly Wage</label>
          <input type="number" name="wage" defaultValue={this.props.wage} />
        </div>
        <div>
          <label htmlFor="startDate">Open Start Date </label>
          <input type="date" name="startDate" defaultValue={date} />
        </div>
        <div>
          <fieldset>
            <legend>Class Date</legend>
            <label htmlFor="classDateDay">Day: </label>
            <select name="classDateDay" defaultValue={this.props.classDateDay}>
              <option value="">Select Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
            <br />
            <label htmlFor="classDateTime">Time: </label>
            <input
              type="time"
              name="classDateTime"
              defaultValue={this.props.classDateTime}
            />
          </fieldset>
        </div>
        <div>
          <label htmlFor="description">Class Description</label>
          <textarea
            name="description"
            rows="15"
            placeholder="Tell us more about your class..."
            defaultValue={this.props.description}
          />
        </div>
        <input type="submit" />
        <Link to="/dashboard">
          <button onClick={this.props.cancelEditing} className="cancel-edit">
            Cancel
          </button>
        </Link>
      </form>
    );
  }
}
