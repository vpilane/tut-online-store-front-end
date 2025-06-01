import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './HomeCss.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const username = localStorage.getItem("loggedInUser");
const generateOrderNumber = () => {
  // Simple random order number (e.g., ORD-20240520-123456)
  const now = new Date();
  return (
    "ORD-" +
    now.getFullYear() +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0") +
    "-" +
    Math.floor(100000 + Math.random() * 900000)
  );
};

const Confirmation_page: React.FC = () => {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState("");
  const [orderSaved, setOrderSaved] = useState<boolean | null>(null);

  useEffect(() => {
    const orderNum = generateOrderNumber();
    setOrderNumber(orderNum);
    localStorage.setItem("orderNumber", orderNum);

    // Prepare order data
    const orderData = {
      orderNo: orderNum,
      isPaid: true,
      isPicked: false,
      isDelivered: false,
      trackOrder: orderNum
    };

    //prepare updateAccount data
    const updateAccountData = {
      orderNo: orderNum,
      isPaid: true,
      isPicked: false,
      isDelivered: false,
      trackOrder: "Processing"
    };

    const updateAccountD = {
      username: username,
      orderNo: orderNum,
      trackOrder: "Processing"
    };

    // Send order data to backend
    fetch("https://tut-online-store.onrender.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (res.ok) setOrderSaved(true);
        else setOrderSaved(false);
        // After addOrder, call updateAccount
        return fetch("https://tut-online-store.onrender.com/updateAccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateAccountD), // send what your backend expects
        });
      })
      .catch(() => setOrderSaved(false));
  }, []);

  return (
    <div className="home-container">
      <div className="container mt-5">
        <div className="card p-4 shadow-sm text-center">
          <h2 className="mb-4 text-success">Order Placed Successfully!</h2>
          <h4>Your order number:</h4>
          <div className="display-6 text-primary mb-4">{orderNumber}</div>
          <p>
            Thank you for your purchase. You will receive an email confirmation shortly.<br />
            Please keep your order number to track your order status.
          </p>
          {orderSaved === false && (
            <div className="alert alert-danger mt-3">
              Failed to save order to database. Please contact support.
            </div>
          )}
          <a href="/home" className="btn btn-primary mt-3">Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default Confirmation_page;
