import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt, faSmile } from "@fortawesome/free-solid-svg-icons";

export default function() {
  return (
    <div>
      <section>
        <header>
          <FontAwesomeIcon icon={faFireAlt} className="fa-3x" />
          <h3>Search Open Classes</h3>
        </header>
        <p>
          Find studios in your area that have open classes and apply with the
          click of a button.
        </p>
      </section>

      <section>
        <header>
          <FontAwesomeIcon icon={faSmile} className="fa-3x" />
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
