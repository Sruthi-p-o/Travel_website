import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [control, setControl] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/allBookings`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  }, [control]);

  const handleDelete = (id) => {
    const checker = window.confirm("Are you sure to delete?");
    if (checker) {
      fetch(`http://localhost:5000/deleteBooking/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            setControl(!control);
          } else {
            setControl(false);
          }
        });
    }
  };

  const handleUpdate = (id) => {
    const url = `http://localhost:5000/bookings/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Update Successful");
          setControl(!control);
        } else {
          setControl(false);
        }
      });
  };

  return (
    <div className="container">
      <h2 className="text-center blue-color">Manage all Bookings</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>#</th>
              <th>Government ID</th>
              <th>Tour Name</th>
              <th>Booked by</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan="9" className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{index + 1}</td>
                  <td><img src={booking.imageUrl} alt="Tour" style={{ width: '100px', height: 'auto' }} /></td>
                  <td>{booking.tourName}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.address}</td>
                  <td>{booking.status}</td>
                  <td>
                    <button onClick={() => handleUpdate(booking._id)} className="btn btn-info">
                      Update
                    </button>{" "}
                    <button onClick={() => handleDelete(booking._id)} className="btn btn-danger">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default ManageBookings;
