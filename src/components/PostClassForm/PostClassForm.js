import React from "react";
import { Link } from "react-router-dom";
import "./PostClassForm.css";

export default class PostClassForm extends React.Component {
  render() {
    return (
      <form>
        <h3>Post a New Class</h3>
        <div>
          <label htmlFor="class-type">Class Format</label>
          <select required name="class-type">
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
          <label htmlFor="open-date">Open Start Date:</label>
          <input type="date" name="open-date" required />
        </div>
        <div>
          <fieldset required>
            <legend>Class Date</legend>
            <label htmlFor="day-of-week">Day: </label>
            <select required name="day-of-week">
              <option value="">Select Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
            <label htmlFor="class-time">Time</label>
            <input type="time" required />
          </fieldset>
        </div>
        <div>
          <label htmlFor="class-description">Class Description</label>
          <textarea
            name="class-description"
            rows="15"
            placeholder="Tell us more about your class..."
          />
        </div>
        <input type="submit" />
        <Link to="/dashboard">
          <button onClick={this.props.cancelPost}>Cancel</button>
        </Link>
      </form>
    );
  }
}
