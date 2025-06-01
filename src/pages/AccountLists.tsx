import React, { useEffect, useState } from "react";
                 import { useNavigate } from "react-router-dom"; // Add this import

const AccountLists: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    fetch("https://tut-online-store.onrender.com/getAllAccounts")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched accounts:", data);
        setAccounts(data);
      })
      .catch(() => setError("Failed to fetch accounts."));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All User Accounts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center">No accounts found.</td>
            </tr>
          ) : (
            accounts.map((acc, idx) => (
              <tr key={idx}>
                <td>{acc.username}</td>
                <td>{acc.role}</td>
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
};

export default AccountLists;