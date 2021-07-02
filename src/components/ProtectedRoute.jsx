import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/unauthorized" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
