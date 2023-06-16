import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Customer() {
  const [customers, getCustomer] = useState([]);
  const [custompolicy, setcustompolicy] = useState([]);

  const getCustomersList = () => {
    fetch("http://localhost:8084/api/customer")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        getCustomer(data);
        console.log(data);
        console.log(getCustomer);
        console.log(customers);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  const getPolicyDetailsofCustomer = (id) => {
    try {
      fetch("http://localhost:8084/api/customer/" + id)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          console.log(res);
          setcustompolicy(res.policyResponse);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch {}
  };

  useEffect(() => {
    getCustomersList();
  }, []);
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">CustomerID</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Email ID</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Policy ID</th>
          </tr>
        </thead>
        {customers.map((c) => {
          return (
            <tbody>
              <tr>
                <th scope="row">{c.customerID}</th>
                <td>{c.customerName}</td>
                <td>{c.dateofBirth}</td>
                <td>{c.emailId}</td>
                <td>{c.phoneNumber}</td>
                <td>{c.policyId}</td>

                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => getPolicyDetailsofCustomer(c.customerID)}
                  >
                    Get Policy Details
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Policy Details
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table>
                <thead>
                  <tbody>
                    <tr>
                      <th>Policy Id</th>
                      <td>{custompolicy.policyID}</td>
                    </tr>
                    <tr>
                      <th>Policy Duration</th>
                      <td>{custompolicy.policyDuration}</td>
                    </tr>
                    <tr>
                      <th>Policy Name</th>
                      <td>{custompolicy.policyName}</td>
                    </tr>
                    <tr>
                      <th>Policy Type</th>
                      <td>{custompolicy.policyType}</td>
                    </tr>
                    <tr>
                      <th>Policy Premium Amount</th>
                      <td>{custompolicy.policyPremiumAmount}</td>
                    </tr>
                    <tr>
                      <th>Policy Expiry Date</th>
                      <td>{custompolicy.policyExpiryDate}</td>
                    </tr>
                  </tbody>
                </thead>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Customer;
