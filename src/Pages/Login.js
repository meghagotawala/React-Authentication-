import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Action/authAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format.";
    if (!password) newErrors.password = "Password is required.";
    if (!role) newErrors.role = "Please select a role.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    if (users.length === 0) {
      setErrors({ global: "No registered users found. Please register first." });
      return;
    }

    const user = users.find(
      (u) => u.email === email && u.password === password && u.role.toLowerCase() === role.toLowerCase()
    );

    if (user) {
      dispatch(login({ email: user.email, role: user.role }));
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setErrors({ global: "Invalid credentials or role." });
    }
  };

  return (
    <div className="main">
      <div className="col-12 col-md-6">
        <div className="login-form">
          <h2>Login</h2>
          <form className="w-75 border p-3" onSubmit={handleLogin}>
            {errors.global && <div className="alert alert-danger">{errors.global}</div>}

            <div className="d-flex flex-column gap-2 mt-2">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <div className="d-flex flex-column gap-2 mt-2">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>

            <div className="d-flex flex-column gap-2 mt-2">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose role</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
              {errors.role && <small className="text-danger">{errors.role}</small>}
            </div>

            <div className="d-flex flex-column gap-2 mt-4">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>

            <div className="d-flex flex-column gap-2 mt-2 text-center">
              <a href="/register">Don't have an account? Register</a>
            </div>
          </form>
        </div>
      </div>
      <div className="d-none d-md-block col-md-6 image-section"></div>
    </div>
  );
};

export default Login;
