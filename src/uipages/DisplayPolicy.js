import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CustomerForm from "../uipages/AdminAddCustomer";
import AdminAddCustomer from "../uipages/AdminAddCustomer";

function DisplayPolicy() {
  const navigate = useNavigate();
  const [policies, getPolicy] = useState([]);
  const getPoliciesList = () => {
    fetch("http://localhost:8083/api/policy")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        getPolicy(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getPoliciesList();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      {policies.map((p) => {
        return (
          <div className="d-inline-flex m-3">
            <div className="card ">
              <div className="card-body">
                <p className="card-text" color="blue">
                  <b>POLICY IDENTIFIER : </b>
                  {p.policyID}
                </p>
                <p className="card-text">
                  <b>POLICY NAME : </b>
                  {p.policyName}
                </p>
                <p className="card-text">
                  <b>POLICY TYPE : </b>
                  {p.policyType}
                </p>
                <p className="card-text">
                  <b>POLICY DURATION(IN YRS) : </b>
                  {p.policyDuration}
                </p>
                <p className="card-text">
                  <b>POLICY PREMIUM AMOUNT : </b>
                  {p.policyPremiumAmount}
                </p>
                <p className="card-text">
                  <b>POLICY EXPIRY DATE : </b>
                  {p.policyExpiryDate}
                </p>
                <button className="btn btn-warning">
                  <a href="/adminaddcustomer">Buy Policy</a>
                </button>
                <span> </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default DisplayPolicy;
