import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../uipages/Agent.css";

function Agent() {
  const navigate = useNavigate();

  const [agent, getAgent] = useState([]);
  const [agentdetails, setagentdetails] = useState([]);
  //const [customerData, setcustomerData] = useState([]);
  const [selectedagent, setselectedagent] = useState(null);
  const [agentId, setagentId] = useState("");
  const [cid, setcid] = useState("");
  const customerData = {
    agentId: agentId,
    cid: cid,
  };
  // const [deletedagent, setdeletedagent] = useState([]);

  const getAgentsList = () => {
    fetch("http://localhost:8088/api/agent")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        getAgent(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getAgentDetailsById = (id) => {
    fetch("http://localhost:8088/api/agent/" + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("agentId", id);
        setagentdetails(data.customers);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const deleteAgent = (id) => {
    if (window.confirm("Do you wnant to remove this agent?")) {
      fetch("http://localhost:8088/api/agent/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          console.log("agent with id ${id} is deleted");
          getAgent(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
      toast.success("Agent deleted successfully");
      navigate("/");
    }
  };

  const deleteCustomerFromAgent = (aid, cid) => {
    fetch("http://localhost:8088/api/agent/" + aid + "/del/customer/" + cid, {
      method: "DELETE",
    })
      .then((res) => {
        toast.success("Customer Deleted Successfully");
        navigate("/agents");
        return res.json();
      })

      .catch((err) => {
        console.error(err.message);
      });
  };
  const openWindow = (data) => {
    setselectedagent(data);
    setagentId(data.agentId);
    setcid("");
  };
  const closeWindow = () => {
    setselectedagent(null);
    setagentId("");
    setcid("");
  };

  const addCustomertoAgent = async () => {
    const agentIdVariable = sessionStorage.getItem("agentId");
    try {
      await axios.post(
        "http://localhost:8088/api/agent/" + agentIdVariable + "/addcustomer",
        customerData
      );
      toast.success("Customer added successfully");
      getAgentsList();
    } catch (error) {
      console.error(error.message);
      toast.error("try again later");
    }
  };

  useEffect(() => {
    getAgentsList();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Agent Id</th>
            <th scope="col">Agent Name</th>
          </tr>
        </thead>
        {agent.map((a) => {
          return (
            <tbody>
              <tr>
                <th scope="row">{a.id}</th>
                <td>{a.name}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      getAgentDetailsById(a.id);
                    }}
                  >
                    Customer Details
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => openWindow(a)}
                  >
                    Add Customer
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
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4" id="exampleModalLabel">
                Customer Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-striped">
                <thead>
                  <th scope="col">Customer ID</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Email ID</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Policy ID</th>
                </thead>
                {agentdetails.map((g) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{g.customerID}</td>
                        <td>{g.customerName}</td>
                        <td>{g.emailId}</td>
                        <td>{g.dateofBirth}</td>
                        <td>{g.phoneNumber}</td>
                        <td>{g.policyId}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() =>
                              deleteCustomerFromAgent(
                                sessionStorage.getItem("agentId"),
                                g.customerID
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
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
      {selectedagent && (
        <>
          <h3>ADD CUSTOMER</h3>
          <form>
            <div class="row">
              <div class="col-md-6 mb-4">
                <div class="form-outline">
                  <label class="form-label" for="agentId">
                    Agent ID
                  </label>
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    name="agentId"
                    value={selectedagent.id}
                  />
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div class="form-outline">
                  <label class="form-label" for="customerId">
                    Customer ID
                  </label>
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    name="customerID"
                    value={cid}
                    onChange={(e) => setcid(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addCustomertoAgent}
            >
              Save Changes
            </button>
            <span> </span>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeWindow}
            >
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
}
export default Agent;
