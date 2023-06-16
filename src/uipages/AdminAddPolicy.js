import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminAddPolicy() {
  const navigate = useNavigate();
  const [policyName, setpolicyName] = useState("");
  const [policyType, setpolicyType] = useState("");
  const [policyPremiumAmount, setpolicyPremiumAmount] = useState("");
  const [policyDuration, setpolicyDuration] = useState("");
  const [policyExpiryDate, setpolicyExpiryDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8083/api/policy/", {
        policyName,
        policyType,
        policyPremiumAmount,
        policyDuration,
        policyExpiryDate,
      });
      if (response.status == 200) {
        setpolicyName("");
        setpolicyType("");
        setpolicyPremiumAmount("");
        setpolicyDuration("");
        setpolicyExpiryDate("");
      } else {
        // Handle error response
        toast.error("Policy not added");
        console.error("Error creating customer");
      }
    } catch (error) {
      console.error(error.message);
    }
    toast.success("Policy Added Successfully");
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="col-md-6 mb-4">
            <div class="form-outline">
              <input
                type="text"
                id="policyName"
                value={policyName}
                onChange={(e) => setpolicyName(e.target.value)}
                class="form-control form-control-lg"
              />
              <label class="form-label" for="policyName">
                Policy Name
              </label>
            </div>
          </div>
          <div class="col-md-6 mb-4">
            <div class="form-outline">
              <input
                type="text"
                id="policyType"
                value={policyType}
                onChange={(e) => setpolicyType(e.target.value)}
                class="form-control form-control-lg"
              />
              <label class="form-label" for="policyType">
                Policy Type
              </label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-4 d-flex align-items-center">
            <div class="form-outline datepicker w-100">
              <input
                type="number"
                class="form-control form-control-lg"
                id="policyDuration"
                value={policyDuration}
                onChange={(e) => setpolicyDuration(e.target.value)}
              />
              <label for="policyDuration" class="form-label">
                Policy Duration
              </label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-4 pb-2">
            <div class="form-outline">
              <input
                type="number"
                id="policyPremiumAmount"
                class="form-control form-control-lg"
                value={policyPremiumAmount}
                onChange={(e) => setpolicyPremiumAmount(e.target.value)}
              />
              <label class="form-label" for="policyPremiumAmount">
                Policy Premium Amount
              </label>
            </div>
          </div>
          <div class="col-md-6 mb-4 pb-2">
            <div class="form-outline">
              <input
                type="date"
                id="policyExpiryDate"
                class="form-control form-control-lg"
                value={policyExpiryDate}
                onChange={(e) => setpolicyExpiryDate(e.target.value)}
              />
              <label class="form-label" for="">
                Policy Expiry date
              </label>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-2">
          <input
            class="btn btn-primary btn-lg"
            type="submit"
            value="Add/Update Policy"
          />
        </div>
      </form>
    </div>
  );
}
export default AdminAddPolicy;
