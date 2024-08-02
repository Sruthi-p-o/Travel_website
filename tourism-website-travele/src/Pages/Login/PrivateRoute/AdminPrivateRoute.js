import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated');

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdminAuthenticated ? <Component {...props} /> : <Redirect to="/admin/login" />
      }
    />
  );
};

export default AdminPrivateRoute;
