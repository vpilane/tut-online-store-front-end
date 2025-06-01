import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/home");
    }, 2000); // Show message for 2 seconds before redirecting
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <h2 className="text-success">You have been logged out successfully!</h2>
      <p>Redirecting to home page...</p>
    </div>
  );
};

export default Logout;