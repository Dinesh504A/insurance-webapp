import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Policy from "./uipages/Policy";
import Customer from "./uipages/Customer";
import AddPolicy from "./uipages/AddPolicy";
import Agent from "./uipages/Agent";
import AdminAddPolicy from "./uipages/AdminAddPolicy";
import AdminAddCustomer from "./uipages/AdminAddCustomer";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Policy />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/addPolicy" element={<AddPolicy />} />
          <Route path="/agents" element={<Agent />} />
          <Route path="/adminaddpolicy" element={<AdminAddPolicy />} />
          <Route path="/adminaddcustomer" element={<AdminAddCustomer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
