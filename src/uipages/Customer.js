import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

function Customer() {
  const navigate = useNavigate();
  const [customers, getCustomer] = useState([]);
  const [custompolicy, setcustompolicy] = useState([]);
  const [selectedCustomer, setselectedCustomer] = useState(null);
  const [updatedData, setupdatedData] = useState({
    customerID: "",
    customerName: "",
    dateofBirth: "",
    phoneNumber: "",
    emailId: "",
    policyId: "",
  });

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
        console.error(err.message());
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
          console.log(err.message());
        });
    } catch {}
  };
  const openUpdatePage = (customer) => {
    setselectedCustomer(customer);
    setupdatedData({
      customerID: customer.customerID,
      customerName: customer.customerName,
      dateofBirth: customer.dateofBirth,
      phoneNumber: customer.phoneNumber,
      emailId: customer.emailId,
      policyId: customer.policyId,
    });
  };
  const closeUpdateWindow = () => {
    setselectedCustomer(null);
    setupdatedData({
      customerID: "",
      customerName: "",
      dateofBirth: "",
      phoneNumber: "",
      emailId: "",
      policyId: "",
    });
  };

  const updateCustomer = async () => {
    try {
      await axios.put(
        "http://localhost:8084/api/customer/update/" +
          selectedCustomer.customerID,
        updatedData
      );
      //closeUpdateWindow();
      toast.success("Customer updated Successfully");
      //closeUpdateWindow();
      getCustomersList();

      navigate("/customer");
    } catch (error) {
      console.error(error.message());
      toast.error("Please try again");
    }
  };
  const handleInputChange = (e) => {
    setupdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getCustomersList();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
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
              <tr
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => getPolicyDetailsofCustomer(c.customerID)}
              >
                <th scope="row">{c.customerID}</th>
                <td>{c.customerName}</td>
                <td>{c.dateofBirth}</td>
                <td>{c.emailId}</td>
                <td>{c.phoneNumber}</td>
                <td>{c.policyId}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                    onClick={() => {
                      openUpdatePage(c);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Policy Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectedCustomer && (
        <>
          <div
            className="modal fade"
            id="exampleModal2"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel2"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel2">
                    Update Customer
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" for="policyId">
                            Customer ID
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="customerID"
                            value={updatedData.customerID}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" for="customerName">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="customerName"
                            value={updatedData.customerName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" for="dateofBirth">
                            Policy Type
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="dateofBirth"
                            value={updatedData.dateofBirth}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" for="phoneNumber">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="phoneNumber"
                            value={updatedData.phoneNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" for="policyId">
                            Policy Id
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="policyId"
                            value={updatedData.policyId}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" for="emailId">
                            Email Id
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="policyExpiryDate"
                            value={updatedData.emailId}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={updateCustomer}
                    >
                      Save Changes
                    </button>
                    <span> </span>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={closeUpdateWindow}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Customer;
