import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

const AdminAddpolicy = () => {
  const navigate = useNavigate();

  const [policyName, setpolicyName] = useState("");
  const [policyType, setpolicyType] = useState("");
  const [policyPremiumAmount, setpolicyPremiumAmount] = useState("");
  const [policyDuration, setpolicyDuration] = useState("");
  const [policyExpiryDate, setpolicyExpiryDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const policyData = {
        policyName: policyName,
        policyType: policyType,
        policyPremiumAmount: policyPremiumAmount,
        policyDuration: policyDuration,
        policyExpiryDate: policyExpiryDate,
      };
      const response = await axios.post(
        "http://localhost:8083/api/policy",
        policyData
      );
      console.log("Policy added successfully");
      toast.success("Policy added succesfully");
      navigate("/policy");
      setpolicyName("");
      setpolicyType("");
      setpolicyPremiumAmount("");
      setpolicyDuration("");
      setpolicyExpiryDate("");
    } catch (error) {
      console.error(error.message);
      toast.error("Please try again later");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <form>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <input
                type="text"
                id="policyName"
                value={policyName}
                onChange={(e) => setpolicyName(e.target.value)}
                className="form-control form-control-lg"
              />
              <label className="form-label" for="policyName">
                Policy Name
              </label>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <input
                type="text"
                id="policyType"
                value={policyType}
                onChange={(e) => setpolicyType(e.target.value)}
                className="form-control form-control-lg"
              />
              <label className="form-label" for="policyType">
                Policy Type
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4 d-flex align-items-center">
            <div className="form-outline datepicker w-100">
              <input
                type="number"
                className="form-control form-control-lg"
                id="policyDuration"
                value={policyDuration}
                onChange={(e) => setpolicyDuration(e.target.value)}
              />
              <label for="policyDuration" className="form-label">
                Policy Duration
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <input
                type="number"
                id="policyPremiumAmount"
                className="form-control form-control-lg"
                value={policyPremiumAmount}
                onChange={(e) => setpolicyPremiumAmount(e.target.value)}
              />
              <label className="form-label" for="policyPremiumAmount">
                Policy Premium Amount
              </label>
            </div>
          </div>
          <div className="col-md-6 mb-4 pb-2">
            <div className="form-outline">
              <input
                type="date"
                id="policyExpiryDate"
                className="form-control form-control-lg"
                value={policyExpiryDate}
                onChange={(e) => setpolicyExpiryDate(e.target.value)}
              />
              <label className="form-label" for="phoneNumber">
                Policy Expiry date
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-2">
          <input
            className="btn btn-primary btn-lg"
            type="submit"
            value="Add Policy"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};
export default AdminAddpolicy;
