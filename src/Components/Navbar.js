import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary text-white">
        <div className="container-fluid ">
          <a className="navbar-brand " href="/">
            <b>POLICY BAZAAR</b>
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
              {localStorage.getItem("rolename") === "ADMIN" ? (
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/policy"
                >
                  Our Policies
                </a>
              ) : (
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/displaypolicy"
                >
                  Our Policies
                </a>
              )}
              {localStorage.getItem("rolename") === "ADMIN" ? (
                <a className="nav-link" href="/customer">
                  Customers
                </a>
              ) : (
                <a className="nav-link disabled">Customers</a>
              )}
              {localStorage.getItem("rolename") === "AGENT" ||
              localStorage.getItem("rolename") === "ADMIN" ? (
                <a className="nav-link" href="/agents">
                  Agents
                </a>
              ) : (
                <a className="nav-link disabled">Agents</a>
              )}
              {localStorage.getItem("rolename") === "ADMIN" ? (
                <a className="nav-link " href="/payments" tabIndex="-1">
                  Payments
                </a>
              ) : (
                <a className="nav-link disabled " tabIndex="-1">
                  Payments
                </a>
              )}
              <span> </span>

              <button
                className="btn btn-danger"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginLeft: "auto",
                }}
                onClick={() => {
                  localStorage.removeItem("jwttoken");
                  localStorage.removeItem("username");
                  localStorage.removeItem("rolename");
                  toast.success("Logged out successfully");
                  console.log("All localstorage items are removed");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
