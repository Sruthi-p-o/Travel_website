import React from "react";
import { Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const PrivateRoute = ({ children, adminOnly, ...rest }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner animation="border" variant="danger" />;
  }

  // If adminOnly is true and user is not admin, redirect to login
  if (adminOnly && (!user || !user.isAdmin)) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: rest.location }
        }}
      />
    );
  }

  // If adminOnly is false or user is admin, render children
  return (
    <Route {...rest}>
      {user && user.email ? children : <Redirect to="/login" />}
    </Route>
  );
};

export default PrivateRoute;
