import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  //const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("username");
    localStorage.removeItem("rolename");
    toast.success("Logged out successfully");
    //navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary text-white">
        <div className="container-fluid ">
          <a className="navbar-brand " href="/">
            INSURANCE WEB APP
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
              <a className="nav-link" href="/customer">
                Customers
              </a>
              <a className="nav-link" href="/agents">
                Agents
              </a>
              <a className="nav-link " href="/payments" tabindex="-1">
                Payments
              </a>
              <span> </span>
              <a
                className="nav-link "
                href="/login"
                tabindex="-1"
                style={{ float: "right" }}
              >
                Log In
              </a>
              <a className="nav-link " href="/register" tabindex="-1">
                Sign Up
              </a>
              <button
                className="nav-link logout-button"
                onClick={handleLogout}
              ></button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
