import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeCss.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Driver_home: React.FC = () => {
  const [Orders, setOrders] = useState<any[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all orders from backend
    fetch("https://tut-online-store.onrender.com/getAllOrders") // Change to your backend endpoint
      .then(res => res.json())
      .then(data => {
        console.log("Fetched orders:", data); // <--- Add this line
        setOrders(data);
    console.log("Orders state updated:", Orders); // <--- Add this line
      })
      .catch(err => {
        setOrders([]);
        console.error("Failed to fetch orders:", err);
      });
  }, []);

  const handleCheckboxChange = (orderNo: string, checked: boolean) => {
    setSelectedOrders(prev =>
      checked
        ? [...prev, orderNo]
        : prev.filter(no => no !== orderNo)
    );
  };

  const handlePick = async () => {
    if (selectedOrders.length === 0) {
      alert("Please select at least one order to pick.");
      return;
    }
    try {
   
      // Send selected order numbers to backend to update their status
      const response = await fetch("https://tut-online-store.onrender.com/pickOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderNo: selectedOrders[0] }),
      });
      if (response.ok) {
        alert("Order(s) picked successfully!");
        // Optionally, refresh the orders list
        const updatedOrders = await fetch("https://tut-online-store.onrender.com/getAllOrders").then(res => res.json());
        setOrders(updatedOrders);
        setSelectedOrders([]);
      } else {
        alert("Failed to pick orders.");
      }
    } catch (error) {
      alert("An error occurred while picking orders.");
    }
  };

  return (
    <div className="home-container">
      <h1 className="display-4 mb-4">Driver's manager</h1>
      <div className="container mt-4">
        <h3>All Orders</h3>
        <table className="table table-bordered table-striped mt-3">
          <thead>
            <tr>
              <th>Select</th>
              <th>Order No</th>
              <th>Paid</th>
              <th>Picked</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {Orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">No orders found.</td>
              </tr>
            ) : (
              Orders.map((orders, idx) => (
                <tr key={idx}>
                  <td>
                    {!orders.isPicked && (
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(orders.orderNo)}
                        onChange={e => handleCheckboxChange(orders.orderNo, e.target.checked)}
                      />
                    )}
                  </td>
                  <td>{orders.orderNo}</td>
                  <td>{orders.isPaid ? "Yes" : "No"}</td>
                  <td>{orders.isPicked ? "Yes" : "No"}</td>
                  <td>{orders.isDelivered ? "Yes" : "No"}</td>
                  <td>
                    {orders.isPicked && !orders.isDelivered && (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={async () => {
                          try {
                            const response = await fetch("https://tut-online-store.onrender.com/deliverOrder", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ orderNo: orders.orderNo }),
                            });
                            if (response.ok) {
                              alert("Order marked as delivered!");
                              // Refresh orders list
                              const updatedOrders = await fetch("https://tut-online-store.onrender.com/getAllOrders").then(res => res.json());
                              setOrders(updatedOrders);
                            } else {
                              alert("Failed to update delivery status.");
                            }
                          } catch {
                            alert("An error occurred while updating delivery status.");
                          }
                        }}
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <button
          className="btn btn-success mt-3"
          onClick={handlePick}
          disabled={selectedOrders.length === 0}
        >
          Pick Selected Orders
        </button>
      </div>
    </div>
  );
};

export default Driver_home;