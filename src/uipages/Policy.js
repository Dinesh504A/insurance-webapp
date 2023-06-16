import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Policy() {
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
  const deletePolicy = (id) => {
    if (window.confirm("Do you want to remove this policy?")) {
      fetch("http://localhost:8083/api/policy/delete/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          return res.json();
        })

        .then((res) => {
          console.log(res);
          console.log("policy with id ${id} is deleted", id);
          getPolicy(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
      toast.success("policy deleted successfully");
    }
  };
  useEffect(() => {
    getPoliciesList();
  }, []);

  return (
    <div>
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
                <a href="#" className="btn btn-primary">
                  Update
                </a>
                <span> </span>
                <a
                  href="/"
                  className="btn btn-primary"
                  onClick={() => {
                    deletePolicy(p.policyID);
                  }}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Policy;
