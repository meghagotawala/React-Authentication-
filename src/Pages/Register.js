import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!username || username.length < 3) {
      errors.username = "Username must be at least 3 characters long.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      errors.email = "Enter a valid email address.";
      isValid = false;
    }

    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    if (!role) {
      errors.role = "Please select a role.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newUser = { username, email, password, role };
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    existingUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

    alert("Registration successful! Redirecting to login.");
    navigate("/login");
  };

  return (
    <div className="main">
      <div className="col-12 col-md-6">
        <div className="login-form">
          <h2>Sign Up</h2>
          <form className="w-75 border p-3" onSubmit={handleSubmit}>
            <div className="d-flex flex-column gap-2 mt-2">
              <label>Name</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="text-danger">{errors.username}</p>}
            </div>

            <div className="d-flex flex-column gap-2 mt-2">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

            <div className="d-flex flex-column gap-2 mt-2">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>

            <div className="d-flex flex-column gap-2 mt-2">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose role</option>
                <option value="Viewer">Viewer</option>
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.role && <p className="text-danger">{errors.role}</p>}
            </div>

            <div className="d-flex flex-column gap-2 mt-5">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
            <div className="d-flex flex-column gap-2 mt-2 text-center">
              <a href="/login">Do you have an account? Login</a>
            </div>
          </form>
        </div>
      </div>
      <div className="d-none d-md-block col-md-6 image-section"></div>
    </div>
  );
};

export default Register;
