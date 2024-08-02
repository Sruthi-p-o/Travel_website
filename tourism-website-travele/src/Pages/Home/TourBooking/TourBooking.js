import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { QRCodeCanvas } from "qrcode.react"; 
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import useAuth from "../../../Hooks/useAuth";
import './TourBooking.css'; // Import CSS file

const TourBooking = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState({});
  const { user } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); 

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    fetch(`http://localhost:5000/tour/${tourId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setTour(data))
      .catch((error) => console.error("Error fetching tour details:", error));
  }, [tourId]);

  const onSubmit = (data) => {
    data.userName = user?.displayName;
    data.tourName = tour.name;
    console.log(data);
    fetch("http://localhost:5000/addBooking", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          alert("Booking Successful");
          setShowPayment(true);
          setPaymentLink(`https://payment-gateway.com/pay?bookingId=${result.bookingId}`);
        }
        reset();
      });
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    alert("Payment Successful");
  };

  const handlePayPalSuccess = (details) => {
    alert("Payment Successful via PayPal");
  };

  return (
    <div className="body">
      <div className="service-detail container my-5 border bg-light shadow-lg rounded-3">
        <div className="row gy-5">
          <div className="col-12 col-md-5">
            <div className="p-3">
              <img className="w-100" src={tour?.pic} alt="" height="300" />
            </div>
          </div>
          <div className="col-12 col-md-7">
            <div className="p-3">
              <h1 className="fw-extrabold blue-color">{tour?.name}</h1>
              <h6>
                <i className="fas fa-hand-holding-usd blue-color"></i> cost: ₹{tour?.price} /person
              </h6>
              <h6>
                <i className="fas fa-clock blue-color"></i> Duration: {tour?.duration}
              </h6>
              <p className="fs-5">{tour?.details}</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="mt-5 text-center text-info">Please Enter your info to book this tour</h1>
      <div className="login-box container m-auto mt-5">
        <div className="event-box border border d-flex justify-content-center align-items-center mb-5">
          <div className="login-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name" className="form-label mt-3">
                Name:
               </label>
              <input {...register("userName")} placeholder="Name" id="name" defaultValue={user?.displayName} className="p-2 form-control" />
              <br />

              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input readOnly {...register("email")} placeholder="Email" defaultValue={user?.email} className="p-2 form-control" />
              <br />

              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input {...register("address", { required: true })} placeholder="Address" className="p-2 form-control" />
              <br />

              <label htmlFor="phone" className="form-label">
                Phone No:
              </label>
              <input {...register("phone", { required: true })} placeholder="Phone No" className="p-2 form-control" />
              <br />

              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input type="date" {...register("date", { required: true })} placeholder="Date" className="p-2 form-control" />
              <br />

              <label htmlFor="tourName" className="form-label">
                Tour Name:
              </label>
              <input readOnly {...register("tourName")} placeholder="Tour Name" defaultValue={tour.name} className="p-2 form-control" />
              <br />

              <label htmlFor="imageUrl" className="form-label">
                Upload any Government ID image URL: <span className="instruction-icon"><i className="fas fa-question-circle"></i><span className=" text3 instruction-text">First upload your Government ID card Photo to Google Drive and then copy image URL(Link) and paste here.</span></span>
              </label>
              <input type="text" {...register("imageUrl")} placeholder="Image URL" className="p-2 form-control" />
              <br />

              <input type="submit" className="btn btn-info w-50 mb-3" />
            </form>
          </div>
        </div>
      </div>

      {showPayment && (
        <div className="payment-box container m-auto mt-5">
          <h1 className="text-center text-info">Payment Details</h1>
          <div className="event-box border border d-flex justify-content-center align-items-center mb-5">
            <div className="payment-form">
              <h5 className=" text text-center">Choose a payment method:</h5>
              <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-outline-info mx-2" onClick={() => setPaymentMethod("qr")}>QR Code</button>
                <button className="btn btn-outline-info mx-2" onClick={() => setPaymentMethod("card")}>Card</button>
                <button className="btn btn-outline-info mx-2" onClick={() => setPaymentMethod("paypal")}>PayPal</button>
              </div>

              {paymentMethod === "qr" && (
                <div className="text-center mb-3">
                                    <QRCodeCanvas value={paymentLink} size={256} />
                </div>
              )}

              {paymentMethod === "card" && (
                <form onSubmit={handlePaymentSubmit}>
                  <label htmlFor="cardNumber" className="form-label mt-3">
                    Card Number:
                  </label>
                  <input type="text" id="cardNumber" className="p-2 form-control" required />
                  <br />

                  <label htmlFor="expiryDate" className="form-label">
                    Expiry Date:
                  </label>
                  <input type="text" id="expiryDate" className="p-2 form-control" placeholder="MM/YY" required />
                  <br />

                  <label htmlFor="cvv" className="form-label">
                    CVV:
                  </label>
                  <input type="text" id="cvv" className="p-2 form-control" required />
                  <br/>
                  <input type="submit" className="btn btn-info w-50 mb-3" value="Pay Now" />
                </form>
              )}

              {paymentMethod === "paypal" && (
                <PayPalScriptProvider options={{ "client-id": "your-client-id" }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: tour.price, // Tour price
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        handlePayPalSuccess(details);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourBooking;

                 
