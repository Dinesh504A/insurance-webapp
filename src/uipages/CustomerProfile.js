import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

function CustomerProfile() {
  const navigate = useNavigate();
  const [customer, setcustomer] = useState([]);
  const [custompolicy, setcustompolicy] = useState([]);
  const [payment, setpayment] = useState([]);
  const [allpayments, setallpayments] = useState([]);
  const GetCustomerDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8084/api/customer/email/" +
          localStorage.getItem("username")
      );
      console.log(response);
      response.data === ""
        ? navigate("/displaypolicy")
        : setcustomer(response.data);
    } catch (error) {
      console.error(error.message());
    }
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
  const openPaymentPage = async (cid, pid) => {
    try {
      const response = await axios.get(
        "http://localhost:8086/api/payment/pay/customer/" +
          cid +
          "/policy/" +
          pid
      );
      setpayment(response.data);
    } catch (error) {
      console.error(error.message());
      toast.error("Payment failed");
    }
    closepaymentpage();
  };
  const closepaymentpage = () => {
    toast.success("Your payment was Successful!!!");
  };

  const getCustomerPayments = async (cid) => {
    try {
      const response = await axios.get(
        "http://localhost:8086/api/payment/doneByCust/" + cid
      );
      setallpayments(response.data);
    } catch (error) {
      console.log(error.message());
    }
  };
  useEffect(() => {
    GetCustomerDetails();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className="d-inline-flex m-2">
        <div className="card text-center" style={{ width: "30rem" }}>
          <div className="card-body">
            <h5
              className="card-title heading-box"
              style={{
                border: "2px solid black",
                padding: "10px",
                backgroundColor: "lightgray",
              }}
            >
              Customer Profile
            </h5>
            <table className="table table-striped">
              <thead>
                <tbody>
                  <tr>
                    <th>Customer Name</th>
                    <td>{customer.customerName}</td>
                  </tr>
                  <tr>
                    <th>Customer ID</th>
                    <td>{customer.customerID}</td>
                  </tr>
                  <tr>
                    <th>Date of Birth </th>
                    <td>{customer.dateofBirth}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{customer.phoneNumber}</td>
                  </tr>
                  <tr>
                    <th>Email ID</th>
                    <td>{customer.emailId}</td>
                  </tr>
                  <tr>
                    <th>Policy ID</th>
                    <td>{customer.policyId}</td>
                  </tr>
                  <tr>
                    <th></th>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => {
                          getPolicyDetailsofCustomer(customer.customerID);
                        }}
                      >
                        Get Policy Details
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </thead>
            </table>
          </div>
        </div>
        <span> </span>

        <div className="card" style={{ width: "30rem" }}>
          <div className="card-body">
            <h5
              className="card-title heading-box"
              style={{
                border: "2px solid black",
                padding: "10px",
                backgroundColor: "lightgray",
              }}
            >
              Policy Profile
            </h5>
            <table className="table table-striped">
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
                  <tr>
                    <th></th>
                    <td>
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          openPaymentPage(
                            customer.customerID,
                            custompolicy.policyID
                          );
                        }}
                      >
                        Pay Monthly Amount
                      </button>
                    </td>
                    <span> </span>
                    <button
                      className="btn btn-primary"
                      onClick={() => getCustomerPayments(customer.customerID)}
                    >
                      My Payments
                    </button>
                  </tr>
                </tbody>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <span> </span>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-4" id="exampleModalLabel">
                  Payment Page
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
                        <th>Customer Id</th>
                        <td>{payment.custId}</td>
                      </tr>
                      <tr>
                        <th>Customer Name</th>
                        <td>{payment.custName}</td>
                      </tr>
                      <tr>
                        <th>Policy Id</th>
                        <td>{payment.policyId}</td>
                      </tr>
                      <tr>
                        <th>Policy Name</th>
                        <td>{payment.policyName}</td>
                      </tr>
                      <tr>
                        <th>Payment Status</th>
                        <td>{payment.status}</td>
                      </tr>
                      <tr>
                        <th>Amount to be Paid</th>
                        <td>{payment.amount}</td>
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
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  //onClick={closepaymentpage()}
                >
                  Complete Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4
          className="heading-box"
          style={{
            border: "2px solid black",
            padding: "10px",
            backgroundColor: "lightgray",
          }}
        >
          My Payment Details
        </h4>

        <div>
          <table className="table table-striped">
            <thead></thead>
            <tr>
              <th scope="col">Payment ID</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Policy Id</th>
              <th scope="col">Customer Id</th>
              <th scope="col">Payment Amount</th>
            </tr>
            {allpayments.map((cp) => {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{cp.paymentId}</th>
                    <td>{cp.paymentStatus}</td>
                    <td>{cp.policyId}</td>
                    <td>{cp.custId}</td>
                    <td>{cp.policyAmount}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
export default CustomerProfile;
