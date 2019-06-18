import React from "react";

const AuthContext = React.createContext({
  jwt: "",
  user: {
    _id: "",
    firstName: "",
    type: ""
  },
  setJwt: () => {},
  setAuthUser: () => {},
  refreshAuthToken: () => {}
});

export default AuthContext;
