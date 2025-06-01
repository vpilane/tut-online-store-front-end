import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import

const TrackOrder: React.FC = () => {
  const [orderNo, setOrderNo] = useState("");
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Add this line

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus(null);
    setError(null);

    const orderData = {
      orderNo: orderNo
    };

    try {
      const response = await fetch("https://tut-online-store.onrender.com/trackOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        const data = await response.json();
        setOrderStatus(
          `Paid: ${data.isPaid ? "Yes" : "No"}, Picked: ${data.isPicked ? "Yes" : "No"}, Delivered: ${data.isDelivered ? "Yes" : "No"}, Status: ${data.trackOrder}`
        );
      } else {
        setError("Order not found. Please check your order number.");
      }
    } catch {
      setError("An error occurred while tracking your order.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Track Your Order</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
        <div className="mb-3">
          <label htmlFor="orderNo" className="form-label">Order Number</label>
          <input
            type="text"
            id="orderNo"
            className="form-control"
            value={orderNo}
            onChange={(e) => setOrderNo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Track Order</button>
      </form>
      {orderStatus && (
        <div className="alert alert-success">
          <strong>Order Status:</strong> {orderStatus}
        </div>
      )}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default TrackOrder;