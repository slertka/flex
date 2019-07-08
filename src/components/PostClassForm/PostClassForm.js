import React from "react";
import { Link } from "react-router-dom";
import "./PostClassForm.css";
import AuthContext from "../../context/AuthContext";

export default class PostClassForm extends React.Component {
  static contextType = AuthContext;

  render() {
    return (
      <form onSubmit={this.props.handlePostClass} className="post-class-form">
        <h3 className="postClass-header">Post a New Class</h3>
        <div>
          <select name="type" required>
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
          <input type="number" name="length" required />
        </div>
        <div>
          <label htmlFor="wage">Hourly Wage</label>
          <input type="number" name="wage" required />
        </div>
        <div>
          <label htmlFor="startDate">Open Start Date:</label>
          <input type="date" name="startDate" required />
        </div>
        <div>
          <fieldset>
            <legend>Class Date</legend>
            <label htmlFor="classDateDay">Day: </label>
            <select name="classDateDay" required>
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
            <input type="time" name="classDateTime" required />
          </fieldset>
        </div>
        <div>
          <label htmlFor="description">Additional Info</label>
          <br />
          <textarea
            name="description"
            rows="15"
            placeholder="Tell us more about your class..."
          />
        </div>
        <input type="submit" />
        <Link to="/dashboard">
          <button onClick={this.props.cancelPost} className="cancel-post">
            Cancel
          </button>
        </Link>
      </form>
    );
  }
}
