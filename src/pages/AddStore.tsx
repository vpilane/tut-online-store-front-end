import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStore: React.FC = () => {
  const [store, setStore] = useState({
    storeid: "",
    storeName: "",
    storelocation: "",
    storeContact: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);

    fetch("https://tut-online-store.onrender.com/addStore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(store),
    })
      .then(res => {
        if (res.ok) {
          setStatus("Store added successfully!");
          setStore({
            storeid: "",
            storeName: "",
            storelocation: "",
            storeContact: "",
          });
        } else {
          setError("Failed to add store.");
        }
      })
      .catch(() => setError("Failed to add store."));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Store</h2>
      {status ? (
        <>
          <div className="alert alert-success">{status}</div>
          <div className="text-center mt-4">
            <button className="btn btn-secondary" onClick={() => navigate("/Admin_home")}>
              Back to Admin Home
            </button>
          </div>
        </>
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
            <div className="mb-3">
              <label htmlFor="storeid" className="form-label">Store ID</label>
              <input
                type="text"
                id="storeid"
                name="storeid"
                className="form-control"
                value={store.storeid}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="storeName" className="form-label">Store Name</label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                className="form-control"
                value={store.storeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="storelocation" className="form-label">Store Location</label>
              <input
                type="text"
                id="storelocation"
                name="storelocation"
                className="form-control"
                value={store.storelocation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="storeContact" className="form-label">Store Contact</label>
              <input
                type="text"
                id="storeContact"
                name="storeContact"
                className="form-control"
                value={store.storeContact}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Store</button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddStore;