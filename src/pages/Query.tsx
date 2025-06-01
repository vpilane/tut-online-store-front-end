import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Query: React.FC = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);

    const username = localStorage.getItem("loggedInUser"); // or however you store the username

    fetch("https://tut-online-store.onrender.com/addQuery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, query }),
    })
      .then(res => {
        if (res.ok) {
          setStatus("Query submitted successfully!");
          setQuery("");
        } else {
          setError("Failed to submit query.");
        }
      })
      .catch(() => setError("Failed to submit query."));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Submit Your Query</h2>
      {status ? (
        <>
          <div className="alert alert-success">{status}</div>
          <div className="text-center mt-4">
            <button className="btn btn-secondary" onClick={() => navigate("/Client_home")}>
              Back to Client Home
            </button>
          </div>
        </>
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
            <div className="mb-3">
              <label htmlFor="query" className="form-label">Your Query</label>
              <input
                type="text"
                id="query"
                name="query"
                className="form-control"
                value={query}
                onChange={e => setQuery(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit Query</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Query;