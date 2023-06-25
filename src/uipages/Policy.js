import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import AdminAddpolicy from "./AdminAddPolicy";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Policy() {
  const navigate = useNavigate();
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
    console.log("delete started");
    confirmAlert({
      title: "Confirmation",
      message: "Are you sure you want to delete the policy ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            confirmDelete(id);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const confirmDelete = async (id) => {
    try {
      console.log("fetching delete details");
      await axios.delete("http://localhost:8083/api/policy/delete/" + id);
      getPoliciesList();
      toast.success("Policy deleted successfully");

      console.log("redirecting to policies list");
    } catch (error) {
      console.error("Error deleting policy", error.message());
      toast.error("Please Try again!");
    }
  };
  const openUpdatePage = (policy) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        {selectedPolicy && (
          <>
            <h3>Update Policy</h3>
            <form>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label" for="policyId">
                      Policy ID
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="policyId"
                      value={updatedData.policyID}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label" for="policyId">
                      Policy Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="policyName"
                      value={updatedData.policyName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label" for="policyId">
                      Policy Type
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="policyType"
                      value={updatedData.policyType}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label" for="policyId">
                      Policy Premium Amount
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="policyPremiumAmount"
                      value={updatedData.policyPremiumAmount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label" for="policyId">
                      Policy Duration
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="policyDuration"
                      value={updatedData.policyDuration}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label" for="policyId">
                      Policy Expiry Date
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
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
        {policies.map((p) => {
          return (
            <div className="d-inline-flex m-3">
              <div className="card ">
                <div className="card-body">
                  <p className="card-text" color="blue">
                    <table>
                      <thead>
                        <tr>
                          <th>POLICY IDENTIFIER :</th>
                          <td>{p.policyID}</td>
                        </tr>
                        <tr>
                          <th>POLICY NAME :</th>
                          <td>{p.policyName}</td>
                        </tr>
                        <tr>
                          <th>POLICY TYPE :</th>
                          <td>{p.policyType}</td>
                        </tr>
                        <tr>
                          <th>POLICY DURATION(IN YRS) :</th>
                          <td>{p.policyDuration}</td>
                        </tr>
                        <tr>
                          <th>POLICY PREMIUM AMOUNT :</th>
                          <td>{p.policyPremiumAmount}</td>
                        </tr>
                        <tr>
                          <th>POLICY EXPIRY DATE :</th>
                          <td>{p.policyExpiryDate}</td>
                        </tr>
                        <tr>
                          <th></th>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => openUpdatePage(p)}
                            >
                              Update
                            </button>
                          </td>
                          <span> </span>

                          <button
                            className="btn btn-danger"
                            onClick={() => deletePolicy(p.policyID)}
                          >
                            Delete
                          </button>
                        </tr>
                      </thead>
                    </table>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Policy;
