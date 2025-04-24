import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const sendData = async (e) => {
		e.preventDefault();

		const response = await fetch("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: formData.email,
				password: formData.password,
			}),
		});

		const res = await response.json();
		if (res.message === "Login successful!") {
			navigate("/dashboard");
		}
		// alert(res.message);
	};

  const routeHandeler = () => {
    navigate("/register")
  }

	return (
		<form className="p-4" onSubmit={sendData}>
			<div className="mb-3">
				<label htmlFor="email" className="form-label">
					Email address
				</label>
				<input
					name="email"
					value={formData.email}
					onChange={handleChange}
					type="email"
					className="form-control"
					id="email"
					aria-describedby="emailHelp"
				/>
				<div id="emailHelp" className="form-text">
					We'll never share your email with anyone else.
				</div>
			</div>
			<div className="mb-3">
				<label htmlFor="password" className="form-label">
					Password
				</label>
				<input
					name="password"
					value={formData.password}
					onChange={handleChange}
					type="password"
					className="form-control"
					id="password"
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Login
			</button>
			<p>
				Don't have an account ? <button onClick={routeHandeler}>Register</button>
			</p>
		</form>
	);
};

export default Login;
