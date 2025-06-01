import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckQueries() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuery, setSelectedQuery] = useState<{
    username: string;
    query: string;
  } | null>(null);
  const [response, setResponse] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://tut-online-store.onrender.com/getAllAccounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch(() => setError("Failed to fetch accounts."));
  }, []);

  const handleRespond = () => {
    if (!selectedQuery) return;
    fetch("https://tut-online-store.onrender.com/addQueryResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: selectedQuery.username,
        query: selectedQuery.query,
        queryResponse: response, // <-- must match backend property
      }),
    })
      .then((res) => {
        if (res.ok) {
          setStatus("Response sent successfully!");
          setResponse("");
        } else {
          setStatus("Failed to send response.");
        }
      })
      .catch(() => setStatus("Failed to send response."));
  };

  if (selectedQuery) {
    return (
      <div className="container mt-5">
        <h2 className="mb-4">Query Details</h2>
        <div className="card p-4 shadow-sm mb-4">
          <p>
            <strong>Username:</strong> {selectedQuery.username}
          </p>
          <p>
            <strong>Query:</strong> {selectedQuery.query}
          </p>
          {/* Only show the response input if not successfully sent */}
          {!status && (
            <div className="mb-3">
              <label htmlFor="response" className="form-label">
                Your Response
              </label>
              <textarea
                id="response"
                className="form-control"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={3}
                required
              />
            </div>
          )}
          {!status && (
            <button className="btn btn-success me-2" onClick={handleRespond}>
              Send Response
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSelectedQuery(null);
              setStatus(null);
              setResponse("");
            }}
          >
            Back to All Queries
          </button>
          {status && <div className="alert alert-info mt-3">{status}</div>}
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate("/Admin_home")}>
            Back to Admin Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Queries</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Query</th>
            <th>Respond</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                No queries found.
              </td>
            </tr>
          ) : (
            accounts
              .filter((acc: any) => acc.query && acc.query.trim() !== "")
              .map((acc: any, idx: number) => (
                <tr key={idx}>
                  <td>{acc.username}</td>
                  <td>{acc.query}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        setSelectedQuery({
                          username: acc.username,
                          query: acc.query,
                        })
                      }
                    >
                      Respond Now
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/Admin_home")}>
          Back to Admin Home
        </button>
      </div>
    </div>
  );
}

export default CheckQueries;