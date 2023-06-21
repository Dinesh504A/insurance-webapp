import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import AdminAddpolicy from "./AdminAddPolicy";

function Policy() {
  const [policies, getPolicy] = useState([]);
  const [selectedPolicy, setselectedPolicy] = useState(null);
  const [updatedData, setupdatedData] = useState({
    policyID: "",
    policyName: "",
    policyType: "",
    policyPremiumAmount: "",
    policyDuration: "",
    policyExpiryDate: "",
  });
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
  const openUpdatePage = (policy) => {
    setselectedPolicy(policy);
    setupdatedData({
      policyID: policy.policyID,
      policyName: policy.policyName,
      policyType: policy.policyType,
      policyPremiumAmount: policy.policyPremiumAmount,
      policyDuration: policy.policyDuration,
      policyExpiryDate: policy.policyExpiryDate,
    });
  };
  const closeUpdateWindow = () => {
    setselectedPolicy(null);
    setupdatedData({
      policyID: "",
      policyName: "",
      policyType: "",
      policyPremiumAmount: "",
      policyDuration: "",
      policyExpiryDate: "",
    });
  };
  const updatePolicy = async () => {
    try {
      await axios.put(
        "http://localhost:8083/api/policy/update/" + selectedPolicy.policyID,
        updatedData
      );
      toast.success("Policy updated successfully");
      getPoliciesList();
      closeUpdateWindow();
    } catch (error) {
      console.error(error.message);
      toast.error("Please try again");
    }
  };
  const handleInputChange = (e) => {
    setupdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getPoliciesList();
  }, []);

  return (
    <>
      <Navbar></Navbar>
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
                  <button
                    className="btn btn-warning"
                    onClick={() => openUpdatePage(p)}
                  >
                    Update
                  </button>
                  <span> </span>
                  <a
                    href="/"
                    className="btn btn-danger"
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
        {selectedPolicy && (
          <>
            <h3>Update Policy</h3>
            <form>
              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <label class="form-label" for="policyId">
                      Policy ID
                    </label>
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      name="policyId"
                      value={updatedData.policyID}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <label class="form-label" for="policyId">
                      Policy Name
                    </label>
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      name="policyName"
                      value={updatedData.policyName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <label class="form-label" for="policyId">
                      Policy Type
                    </label>
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      name="policyType"
                      value={updatedData.policyType}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <label class="form-label" for="policyId">
                      Policy Premium Amount
                    </label>
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      name="policyPremiumAmount"
                      value={updatedData.policyPremiumAmount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <label class="form-label" for="policyId">
                      Policy Duration
                    </label>
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      name="policyDuration"
                      value={updatedData.policyDuration}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <label class="form-label" for="policyId">
                      Policy Expiry Date
                    </label>
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      name="policyExpiryDate"
                      value={updatedData.policyExpiryDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updatePolicy}
              >
                Save Changes
              </button>
              <span> </span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeUpdateWindow}
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
export default Policy;
