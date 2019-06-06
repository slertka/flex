import React from "react";
import "./Info.css";

export default function Info() {
  return (
    <div>
      <header role="banner">
        <h1>Flex</h1>
        <h2>Build your yoga network</h2>
        [screen shot of example dashboard from instructor POV]
      </header>

      <section>
        <header>
          <h3>Search Open Classes</h3>
        </header>
        <p>
          Find studios in your area that have open classes and apply with the
          click of a button.
        </p>
      </section>

      <section>
        <header>
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
