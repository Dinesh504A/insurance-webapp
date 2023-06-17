import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../uipages/Agent.css";

function Agent() {
  const navigate = useNavigate();
  const [agent, getAgent] = useState([]);
  const [agentdetails, setagentdetails] = useState([]);
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
        console.log(data.customers);
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

  useEffect(() => {
    getAgentsList();
  }, []);

  return (
    <div>
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
              <tr
              //data-bs-toggle="modal"
              //data-bs-target="#exampleModal"
              // onClick={() => {
              //  getAgentDetailsById(a.id);
              // }}
              >
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
                    Get Customers
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteAgent(a.id);
                    }}
                  >
                    Delete
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
              <button type="button" className="btn btn-primary">
                Add Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Agent;
