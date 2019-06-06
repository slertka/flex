import React from "react";

const ClassContext = React.createContext({
  user: {
    type: "studio", // studio
    firstName: "Ingrid",
    lastName: "Instructor",
    email: "ingrid@yoga.com",
    password: "securepw"
  },
  classes: [
    {
      type: "vinyasa",
      wage: 35,
      length: 60,
      studio: "Flow & Joe",
      startDate: new Date(2019, 6, 15),
      classDateDay: "Monday",
      classDateTime: "17:30"
    },
    {
      type: "hatha",
      wage: 35,
      length: 75,
      studio: "Corepower Yoga",
      startDate: new Date(2019, 6, 12),
      classDateDay: "Wednesday",
      classDateTime: "18:30"
    }
  ]
});

export default ClassContext;
