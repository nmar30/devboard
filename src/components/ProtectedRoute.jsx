import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/unauthorized" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
