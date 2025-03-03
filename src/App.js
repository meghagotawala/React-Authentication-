import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Components/PrivateRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>} />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;