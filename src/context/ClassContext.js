import React from "react";

const ClassContext = React.createContext({
  user: {
    type: "instructor",
    firstName: "Ingrid",
    lastName: "Instructor",
    jwt: null
  },
  classes: [
    {
      id: 1,
      type: "vinyasa",
      wage: 35,
      length: 60,
      studio: "Flow & Joe",
      startDate: new Date(2019, 6, 15),
      classDateDay: "Monday",
      classDateTime: "17:30",
      description:
        "Officia nisi dolore ex consectetur duis velit minim ex duis et voluptate labore. Voluptate ullamco laboris nulla ea occaecat irure ad Lorem irure nulla Lorem nostrud minim. Duis quis adipisicing amet sit fugiat esse nisi et minim aute."
    },
    {
      id: 2,
      type: "hatha",
      wage: 35,
      length: 75,
      studio: "Corepower Yoga",
      startDate: new Date(2019, 6, 12),
      classDateDay: "Wednesday",
      classDateTime: "18:30",
      description:
        "Minim sint qui ipsum et duis consequat dolor reprehenderit mollit. Incididunt ex tempor exercitation reprehenderit consequat elit anim. Qui amet deserunt ullamco sint voluptate. Est velit veniam amet consequat minim culpa do exercitation officia et exercitation in."
    }
  ]
});

export default ClassContext;
