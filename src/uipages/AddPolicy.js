import { useEffect, useState } from "react";

function AddPolicy() {
  const [policy, setPolicy] = useState({
    policyName: "",
    policyType: "",
    policyDuration: 0,
    policyPremiumAmount: 0,
    policyExpiryDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8083/api/policy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(policy),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPolicy({
          policyName: "",
          policyType: "",
          policyDuration: 0,
          policyPremiumAmount: 0,
          policyExpiryDate: "",
        });
      })
      .catch((error) => {
        console.error("Error", error);
      });
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
                value={policy.policyName}
                onChange={(e) => setPolicy(e.target.value)}
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
                value={policy.policyType}
                onChange={(e) => setPolicy(e.target.value)}
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
                value={policy.policyDuration}
                onChange={(e) => setPolicy(e.target.value)}
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
                value={policy.policyPremiumAmount}
                onChange={(e) => setPolicy(e.target.value)}
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
                value={policy.policyExpiryDate}
                onChange={(e) => setPolicy(e.target.value)}
              />
              <label class="form-label" for="phoneNumber">
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
export default AddPolicy;
