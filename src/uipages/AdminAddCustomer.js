import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../uipages/AdminAddCustomer.css";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

const CustomerForm = () => {
  const navigate = useNavigate();
  const [customerName, setcustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [dateofBirth, setdateofBirth] = useState("");
  const [policyId, setpolicyId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8084/api/customer", {
        customerName,
        phoneNumber,
        emailId,
        dateofBirth,
        policyId,
      });
      toast.success("Customer Added Successfully");
      if (response.status === 200) {
        // Customer successfully created

        console.log("Customer created!");
        // Reset form fields
        setcustomerName("");
        setPhoneNumber("");
        setEmailId("");
        setdateofBirth("");
        setpolicyId("");
      } else {
        // Handle error response
        console.error("Error creating customer");
      }
    } catch (error) {
      // Handle network error
      console.error(error.message);
    }

    navigate("/");
  };

  return (
    <div>
      <Navbar></Navbar>
      <section className=" bg-dark">
        <div className="container py-2 h-25">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col">
              <div className="card card-registration my">
                <div className="row ">
                  <div className="col-sm-6 d-none d-sm-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                      alt="Sample photo"
                      className="img-fluid vh-100 vw-100"
                      style={{
                        bordertopleftradius: ".25 rem",
                        borderbottomleftradius: ".25rem",
                      }}
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">
                        Customer registration form
                      </h3>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1m"
                              className="form-control form-control-lg"
                              value={customerName}
                              onChange={(event) =>
                                setcustomerName(event.target.value)
                              }
                            />
                            <label className="form-label" for="form3Example1m">
                              Customer Name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1n"
                              className="form-control form-control-lg"
                              value={phoneNumber}
                              onChange={(event) =>
                                setPhoneNumber(event.target.value)
                              }
                            />
                            <label className="form-label" for="form3Example1n">
                              Phone Number
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1m1"
                              className="form-control form-control-lg"
                              value={emailId}
                              onChange={(event) =>
                                setEmailId(event.target.value)
                              }
                            />
                            <label className="form-label" for="form3Example1m1">
                              Email Id
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1n1"
                              className="form-control form-control-lg"
                              value={dateofBirth}
                              onChange={(event) =>
                                setdateofBirth(event.target.value)
                              }
                            />
                            <label className="form-label" for="form3Example1n1">
                              Date of Birth
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example8"
                          className="form-control form-control-lg"
                          value={policyId}
                          onChange={(event) => setpolicyId(event.target.value)}
                        />
                        <label className="form-label" for="form3Example8">
                          Policy Id
                        </label>
                      </div>

                      <div className="d-flex justify-content-end pt-3">
                        <button
                          type="button"
                          className="btn btn-warning btn-lg ms-2"
                          onClick={handleSubmit}
                        >
                          Add Customer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerForm;
