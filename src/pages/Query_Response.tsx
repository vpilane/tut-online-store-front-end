import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Query_Response: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (!username) {
      setError("No user logged in.");
      return;
    }

    fetch("https://tut-online-store.onrender.com/getAllAccounts")
      .then(res => res.json())
      .then(data => {
        // Find the account for the current user
        const account = data.find((acc: any) => acc.username === username);
        if (account && account.queryResponse) {
          setResponse(account.queryResponse);
        } else {
          setResponse(null);
        }
      })
      .catch(() => setError("Failed to fetch response."));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Query Response Page</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {response ? (
        <div className="alert alert-info mt-4">
          <strong>Your Query Response:</strong>
          <div>{response}</div>
        </div>
      ) : (
        <div className="mt-4">No response available yet.</div>
      )}
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/Client_home")}>
          Back to Client Home
        </button>
      </div>
    </div>
  );
};

export default Query_Response;