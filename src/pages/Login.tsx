import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null); // Add error state
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("https://tut-online-store.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          alert("Login successful!");
          localStorage.setItem("loggedInUser", form.username);
          localStorage.setItem("account", data.role);
          setForm({ username: "", password: "" });

          if (data.role === "Client") {
            navigate("/Client_home");
          } else if (data.role === "Administrator") {
            navigate("/Admin_home");
          } else if (data.role === "Driver") {
            navigate("/Driver_home");
          }
        } else {
          setError("Incorrect username or password."); // Set error message
        }
      })
      .catch(() => {
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <form
      className="container mt-5 p-4 border rounded shadow bg-light login-form"
      onSubmit={handleSubmit}
    >
      <h3 className="mb-4 text-center">Login</h3>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
          <div className="mt-3">
            <a href="/RegisterAccount" className="btn btn-link text-danger p-0">
              Don't have an account? Sign up here.
            </a>
          </div>
          <div className="mt-2">
            Forgot your password?{" "}
            <a href="/reset-password" className="btn btn-link text-primary p-0">
              Reset it here.
            </a>
          </div>
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          placeholder="Enter username"
          required
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Enter password"
          required
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  );
};

export default Login;