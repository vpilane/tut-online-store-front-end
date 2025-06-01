import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterAccount() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    gender: "",
    contact: "",
    address: "",
    username: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://tut-online-store.onrender.com/addAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        alert("Registration successful!");
        setForm({
          name: "",
          surname: "",
          gender: "",
          contact: "",
          address: "",
          username: "",
          password: "",
          role: "",
        });
        navigate("/Login");
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      alert("An error occurred.");
    }
  };

  return (
    <form className="container mt-5 p-4 border rounded shadow bg-light register-form" onSubmit={handleSubmit}>
      <h3 className="mb-4">Register</h3>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" placeholder="Enter name" required value={form.name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="surname" className="form-label">Surname</label>
        <input type="text" className="form-control" id="surname" name="surname" placeholder="Enter surname" required value={form.surname} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="gender" className="form-label">Gender</label>
        <select className="form-select" id="gender" name="gender" required value={form.gender} onChange={handleChange}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="contact" className="form-label">Contact</label>
        <input type="tel" className="form-control" id="contact" name="contact" placeholder="0764436754" required value={form.contact} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input type="text" className="form-control" id="address" name="address" placeholder="14th av, Thabo Mbeki Str, Polokwane" required value={form.address} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" className="form-control" id="username" name="username" placeholder="mk19" required value={form.username} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" required value={form.password} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">Role</label>
        <select className="form-select" id="role" name="role" required value={form.role} onChange={handleChange}>
          <option value="">Select role</option>
          <option value="Driver">Driver</option>
          <option value="Client">Client</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-100">Register</button>
    </form>
  );
}