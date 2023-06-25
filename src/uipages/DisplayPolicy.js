import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";
import CustomerForm from "../uipages/AdminAddCustomer";
import AdminAddCustomer from "../uipages/AdminAddCustomer";

function DisplayPolicy() {
  const navigate = useNavigate();

  // const navigate = useNavigate();
  const [policies, getPolicy] = useState([]);
  const [searchquery, setsearchquery] = useState("");
  const [filteredpolicies, setfilteredpolicies] = useState([]);
  const getPoliciesList = () => {
    fetch("http://localhost:8083/api/policy")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);

        getPolicy(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setsearchquery(query);
    //console.log(policies);
    getPolicy((policies) => {
      return policies.filter((policy) => {
        console.log(searchquery);
        console.log(policy.policyName);
        policy.policyName.toLowerCase().includes(searchquery.toLowerCase());
      });
    });
    console.log(policies);
  };
  useEffect(() => {
    getPoliciesList();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div class="input-group">
        <input
          type="search"
          class="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(e) => setsearchquery(e.target.value)}
        />
        <button
          type="button"
          class="btn btn-outline-primary"
          value={searchquery}
          onClick={handleSearch}
        >
          search
        </button>
      </div>

      {policies.map((p) => {
        return (
          <div className="d-inline-flex m-3">
            <div className="card ">
              <div className="card-body">
                <p className="card-text" color="blue">
                  <table>
                    <thead>
                      <tr>
                        <th>POLICY IDENTIFIER :</th>
                        <td>{p.policyID}</td>
                      </tr>
                      <tr>
                        <th>POLICY NAME :</th>
                        <td>{p.policyName}</td>
                      </tr>
                      <tr>
                        <th>POLICY TYPE :</th>
                        <td>{p.policyType}</td>
                      </tr>
                      <tr>
                        <th>POLICY DURATION(IN YRS) :</th>
                        <td>{p.policyDuration}</td>
                      </tr>
                      <tr>
                        <th>POLICY PREMIUM AMOUNT :</th>
                        <td>{p.policyPremiumAmount}</td>
                      </tr>
                      <tr>
                        <th>POLICY EXPIRY DATE :</th>
                        <td>{p.policyExpiryDate}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <td>
                          <a href="/adminaddcustomer">
                            <button className="btn btn-success">
                              Buy Policy
                            </button>
                          </a>
                        </td>
                        <span> </span>
                      </tr>
                    </thead>
                  </table>
                </p>
                <span> </span>
              </div>
            </div>
            <ToastContainer />
          </div>
        );
      })}
    </>
  );
}
export default DisplayPolicy;
