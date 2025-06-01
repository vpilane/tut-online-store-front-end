import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeCss.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type UserProfile = {
  username: string;
  email: string;
  phone?: string;
  address?: string; // Add address field
  // Add other fields as needed
};

const Edit_profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    console.log("Username from localStorage:", username); // Debug line
    if (!username) {
      setError("No user logged in.");
      return;
    }
    fetch(`https://tut-online-store.onrender.com/getId?username=${encodeURIComponent(username)}`)
      .then(res => {
        if (!res.ok) throw new Error("Bad response");
        return res.json();
      })
      .then(data => setProfile(data))
      .catch(() => setError("Failed to fetch profile."));
    
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setError(null); // Clear previous errors
    setStatus(null); // Optionally clear previous status
    fetch("https://tut-online-store.onrender.com/updateAccounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then(res => {
        if (res.ok) {
          setStatus("Profile updated successfully.");
        } else {
          setError("Failed to update profile.");
        }
      })
      .catch(() => setError("Failed to update profile."));
  };

  if (error) {
    return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  }

  if (!profile) {
    return <div className="container mt-5">Loading profile...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Profile</h2>
      {status && <div className="alert alert-success">{status}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={profile.username || ""} // Always a string
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder={profile.email || ""}
            value={profile.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Contact Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            placeholder={profile.phone || ""}
            value={profile.phone || ""} // Always a string
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            placeholder={profile.address || ""}
            value={profile.address || ""} // Always a string
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/Client_home")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Edit_profile;