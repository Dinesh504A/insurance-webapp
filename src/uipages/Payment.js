import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

function Payment() {
  const [payment, getpayment] = useState([]);
  const [customer, setcustomer] = useState([]);

  const getPaymentsList = async () => {
    try {
      const response = await axios.get("http://localhost:8086/api/payment/all");
      if (response.status === 200) {
        getpayment(response.data);
      } else {
        console.error("error getting payment details");
      }
      return response;
    } catch (err) {
      console.error(err.message());
    }
  };
  const getCustomerById = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:8084/api/customer/byId/" + id
      );
      if (response.status === 200) {
        setcustomer(response.data);
      } else {
        console.error("could not fetch customer details");
      }
    } catch (err) {
      console.error(err.message());
    }
  };
  useEffect(() => {
    getPaymentsList();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Payment ID</th>
            <th scope="col">Customer ID</th>
            <th scope="col">Policy ID</th>
            <th scope="col">Policy Monthly Amount</th>
            <th scope="col">Payment Status</th>
          </tr>
        </thead>
        {payment.map((p) => {
          return (
            <tbody>
              <tr
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                  getCustomerById(p.custId);
                }}
              >
                <th scope="row">{p.paymentId}</th>
                <td>{p.custId}</td>
                <td>{p.policyId}</td>
                <td>{p.policyAmount}</td>
                <td>{p.paymentStatus}</td>
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
                Customer Details
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
                      <th>Customer ID</th>
                      <td>{customer.customerID}</td>
                    </tr>
                    <tr>
                      <th>Customer Name</th>
                      <td>{customer.customerName}</td>
                    </tr>
                    <tr>
                      <th>Customer Phone Number</th>
                      <td>{customer.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>Customer Email</th>
                      <td>{customer.emailId}</td>
                    </tr>
                    <tr>
                      <th>Customer Policy</th>
                      <td>{customer.policyId}</td>
                    </tr>
                    <tr>
                      <th>Customer DOB</th>
                      <td>{customer.dateofBirth}</td>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
