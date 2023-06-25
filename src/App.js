import "./App.css";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Policy from "./uipages/Policy";
import Customer from "./uipages/Customer";
import AddPolicy from "./uipages/AddPolicy";
import Agent from "./uipages/Agent";
import AdminAddPolicy from "./uipages/AdminAddPolicy";
import AdminAddCustomer from "./uipages/AdminAddCustomer";
import Payment from "./uipages/Payment";
import Login from "./uipages/Login";
import Register from "./uipages/Registration";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CustomerProfile from "./uipages/CustomerProfile";
import DisplayPolicy from "./uipages/DisplayPolicy";

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/register" element={<Register />}></Route>

          <Route path="/displaypolicy" element={<DisplayPolicy />}></Route>
          <Route path="/policy" element={<Policy />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/addPolicy" element={<AddPolicy />} />
          <Route path="/agents" element={<Agent />} />
          <Route path="/adminaddpolicy" element={<AdminAddPolicy />} />
          <Route path="/adminaddcustomer" element={<AdminAddCustomer />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/profile" element={<CustomerProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
