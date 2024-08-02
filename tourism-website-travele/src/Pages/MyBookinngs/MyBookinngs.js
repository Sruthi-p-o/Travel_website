import React, { useEffect, useState } from "react";
import { Spinner, Table, Button } from "react-bootstrap";
import useAuth from "../../Hooks/useAuth";
import logo from '../../Images/logo.png';
import image1 from '../../Images/image1.png'; // Replace with actual paths
import image2 from '../../Images/image2.png'; // Replace with actual paths
import image3 from '../../Images/image3.png'; // Replace with actual paths
import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
applyPlugin(jsPDF);

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/myBookings/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, [user?.email]);

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
            setLoading(true);
            fetch(`http://localhost:5000/myBookings/${user?.email}`)
              .then((res) => res.json())
              .then((data) => {
                setBookings(data);
                setLoading(false);
              })
              .catch((error) => {
                console.error("Error re-fetching bookings:", error);
                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
          setLoading(false);
        });
    }
  };

  const calculateTotalPrice = (price) => {
    const taxPercentage = 18;
    const fixedPrice = 5000;
    const totalPrice = fixedPrice + (fixedPrice * (taxPercentage / 100));
    return totalPrice;
  };

  const downloadInvoice = (booking) => {
    const doc = new jsPDF();

    // Add the logo at the top of the document
    const logoWidth = 30;
    const logoHeight = 30;
    doc.addImage(logo, 'PNG', 20, 10, logoWidth, logoHeight);

    doc.setFontSize(12);
    doc.text(20, 50, 'Invoice');

    const headers = ['Tour Name', 'Booked by', 'Phone', 'Address', 'Status', 'Price (INR)', 'Tax (%)', 'Total Price (INR)'];
    const rows = bookings.map((booking) => {
      const totalPrice = calculateTotalPrice(booking.price);
      return [
        booking.tourName,
        booking.email,
        booking.phone,
        booking.address,
        booking.status,
        `₹5000`,
        '18%',
        `₹${totalPrice.toFixed(2)}`
      ];
    });

    doc.autoTable({
      startY: 60, // Start after the title
      head: [headers],
      body: rows
    });

    // Add instructions from middle of the page to end
    doc.setFontSize(10);
    const instructions = `
Instructions:
1. This invoice is generated based on your booking information.
2. Please keep this invoice for your records.
3. Contact us at support@tourcompany.com for any queries or concerns.
4. Ensure to carry a printed copy of this invoice during your trip.
5. For cancellations or modifications, please refer to our cancellation policy on our website.
6. This is a computer-generated document and does not require a signature.
`;
    doc.text(20, doc.autoTable.previous.finalY + 10, instructions);

    // Add images to the end of the document
    const imgYPosition = doc.autoTable.previous.finalY + 60; // Adjust the Y position if needed
    const imgWidthLarge = 50;
    const imgHeightLarge = 50;

    doc.addImage(image1, 'PNG', 20, imgYPosition, imgWidthLarge, imgHeightLarge);
    doc.addImage(image2, 'PNG', 80, imgYPosition, imgWidthLarge, imgHeightLarge);
    doc.addImage(image3, 'PNG', 140, imgYPosition, imgWidthLarge, imgHeightLarge);

    doc.save(`${booking.tourName}_Invoice.pdf`);
  };

  return (
    <div className="container">
      <h2 className="text-center blue-color">My Bookings</h2>
      <div className="table-responsive">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
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
                <th>Download Invoice</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{index + 1}</td>
                  <td>
                    <img src={booking.imageUrl} alt="Tour" style={{ width: '100px', height: 'auto' }} />
                  </td>
                  <td>{booking.tourName}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.address}</td>
                  <td>{booking.status}</td>
                  <td>
                    <Button onClick={() => handleDelete(booking._id)} variant="danger">
                      Cancel
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => downloadInvoice(booking)} variant="success">
                      Download Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
