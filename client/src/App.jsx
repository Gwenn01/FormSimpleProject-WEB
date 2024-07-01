import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import UserInputs from "./components/UserInputs";
import UserDisplay from "./components/UserDisplay";
import UserUpdate from "./components/UserUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div
      className="container-fluid p-0 m-0 background-color"
      style={{ minHeight: "100vh" }}
    >
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow">
          <div className="container-fluid">
            <Link className="navbar-brand text-primary" to="/">
              <h1>Application Form</h1>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    HOME
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/form">
                    FORM
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/data">
                    DATA
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<UserInputs />} />
          <Route path="/data" element={<UserDisplay />} />
          <Route path="/update" element={<UserUpdate />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
