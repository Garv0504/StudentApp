import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();  // ✅ Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const res = await response.json();
    alert(res.message);

    if (res.message === "Registration successful!") {
      navigate("/login");  // ✅ Redirect to Login after successful registration
    }
  };

  const routeHandler = () => {
    navigate("/login");  // ✅ Fix function name typo & ensure `navigate` is used
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          className="form-control"
          id="name"
          aria-describedby="nameHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <p>
        Already have an account? 
        <button onClick={routeHandler} className="btn btn-link">Login</button> 
      </p>
    </form>
  );
};

export default Registration;
