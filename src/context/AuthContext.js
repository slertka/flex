import React from "react";

let user = {};
let jwt = localStorage.getItem("jwt") || "";

if (localStorage.getItem("user")) {
  user = localStorage.getItem("user");
  user = JSON.parse(user);
}

const AuthContext = React.createContext({
  jwt,
  user: {
    _id: "",
    firstName: "",
    type: "",
    ...user
  },
  setJwt: () => {},
  setAuthUser: () => {},
  refreshAuthToken: () => {}
});

export default AuthContext;
