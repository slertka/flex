import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./PostClassForm.css";
import AuthContext from "../../context/AuthContext";

import { API_URL } from "../../config";

export default class PostClassForm extends React.Component {
  static contextType = AuthContext;

  state = {
    classPosted: null
  };

  createClass = e => {
    e.preventDefault();

    // pull data from form inputs
    const {
      type,
      length,
      wage,
      classDateDay,
      classDateTime,
      startDate,
      description
    } = e.target;

    // create form data object
    const formData = {
      type: type.value,
      length: parseInt(length.value),
      wage: parseInt(wage.value),
      classDateDay: classDateDay.value,
      classDateTime: classDateTime.value,
      startDate: startDate.value,
      description: description.value,
      postedBy: this.context._id
    };
    console.log(formData);

    // get JWT from context
    const jwt = this.context.jwt;

    // set fetch options
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(formData)
    };
    console.log(options);

    // fetch request to POST/create new class
    fetch(`${API_URL}/dashboard/postClass`, options)
      .then(res => {
        if (res.status === 422 || !res.ok) {
          return this.setState({
            classPosted: false
          });
        }
        return res.json();
      })
      .then(resj => {
        console.log(resj);
        return this.setState({
          classPosted: true
        });
      })
      .catch(err => {
        this.setState({
          classPosted: false
        });
        console.log(err);
      });
  };

  render() {
    const redirectToDashboard = this.state.classPosted ? (
      <Redirect to="/dashboard" />
    ) : (
      ""
    );

    return (
      <form onSubmit={e => this.createClass(e)}>
        {redirectToDashboard}
        <h3>Post a New Class</h3>
        <div>
          <label htmlFor="type">Class Format</label>
          <select name="type">
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
          <input type="number" name="length" />
        </div>
        <div>
          <label htmlFor="wage">Hourly Wage</label>
          <input type="number" name="wage" />
        </div>
        <div>
          <label htmlFor="startDate">Open Start Date:</label>
          <input type="date" name="startDate" />
        </div>
        <div>
          <fieldset>
            <legend>Class Date</legend>
            <label htmlFor="classDateDay">Day: </label>
            <select name="classDateDay">
              <option value="">Select Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
            <label htmlFor="classDateTime">Time</label>
            <input type="time" name="classDateTime" />
          </fieldset>
        </div>
        <div>
          <label htmlFor="description">Class Description</label>
          <textarea
            name="description"
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
