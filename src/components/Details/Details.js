import React from "react";
import "./Details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt, faRocket } from "@fortawesome/free-solid-svg-icons";

export default function() {
  return (
    <div>
      <section className="detail-search">
        <header>
          <FontAwesomeIcon icon={faFireAlt} className="fa-3x search-icon" />
          <h3>Search Open Classes</h3>
        </header>
        <p>
          Find studios in your area that have open classes and apply with the
          click of a button.
        </p>
      </section>

      <section className="detail-hire">
        <header>
          <FontAwesomeIcon icon={faRocket} className="fa-3x hire-icon" />
          <h3>Hire Certified Instructors</h3>
        </header>
        <p>
          Easily review potential applicants for open studio classes. Streamline
          the hiring process.
        </p>
      </section>
    </div>
  );
}
