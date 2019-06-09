import React from "react";

const AuthContext = React.createContext({
  user: {
    jwt: null
  }
});

export default AuthContext;
