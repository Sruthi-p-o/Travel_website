import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AddTours from '../AddTours/AddTours';
import ManageBookings from '../MangeBookings/ManageBookings';

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-center my-4">Admin Dashboard</h2>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/admin/dashboard/addTours" className="nav-link">Add Tours</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/dashboard/manageBookings" className="nav-link">Manage Bookings</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-4">
        <Switch>
          <Route path="/admin/dashboard/addTours" component={AddTours} />
          <Route path="/admin/dashboard/manageBookings" component={ManageBookings} />
        </Switch>
      </div>
    </div>
  );
};

export default AdminDashboard;
