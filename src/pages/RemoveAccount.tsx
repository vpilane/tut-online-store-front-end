import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import

const RemoveAccount: React.FC = () => {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Add this line

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);

    try {
      const response = await fetch("https://tut-online-store.onrender.com/deleteAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (response.ok) {
        setStatus("Account deleted successfully.");
      } else {
        setError("Account not found. Please check the username.");
      }
    } catch {
      setError("An error occurred while removing the account.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Remove User Account</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">Remove User</button>
      </form>
      {status && (
        <div className="alert alert-success">{status}</div>
      )}
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/Admin_home")}>
          Back to Admin Home
        </button>
      </div>
    </div>
  );
};

export default RemoveAccount;