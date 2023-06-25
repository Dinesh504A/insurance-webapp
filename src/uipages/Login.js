import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [formErrors, setformErrors] = useState({});
  const [loginErrors, setloginErros] = useState("");
  const handleLogin = async () => {
    const errorsOccured = validateForm();

    setformErrors(errorsOccured);
    console.log(errorsOccured);
    //console.log(setformErrors);
    console.log(formErrors);
    //if (Object.keys(errorsOccured).length > 0) {
    // return;
    //}
    try {
      const response = await axios.post("http://localhost:8090/authenticate", {
        email,
        password,
      });

      console.log(response.data);
      const { jwttoken, username, rolename } = response.data;
      localStorage.setItem("jwttoken", jwttoken);
      localStorage.setItem("username", username);
      localStorage.setItem("rolename", rolename);
      if (rolename.toUpperCase() === "ADMIN") {
        console.log("navigating to admin pages");
        navigate("/adminaddpolicy");
      } else if (rolename.toUpperCase() === "AGENT") {
        console.log("navigating to agent pages");
        navigate("/displaypolicy");
      } else if (rolename.toUpperCase() === "USER") {
        console.log("navigating to profile page");
        navigate("/profile");
      } else {
        navigate("/login");
      }
      toast.success("Login successful");
      setloginErros("");
    } catch (error) {
      if (error) {
        setloginErros("Invalid email or password");
        toast.error("Invalid email or password");
        setemail("");
        setpassword("");
      } else {
        setloginErros("Login failed", error);
        toast.error("Login failed");
        setemail("");
        setpassword("");
      }
      console.log("Login failed");
    }
  };
  const validateForm = () => {
    let errors = [];
    if (!email) {
      errors.email = "Email is required";
      console.log(errors.email);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
      console.log(errors.email);
    }
    if (!password) {
      errors.password = "Password is required";
      console.log(errors.password);
    }
    return errors;
  };
  return (
    <section className="vh-100" style={{ backgroundcolor: "#508bfc" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderradius: "1rem" }}
            >
              {loginErrors && (
                <div className="alert alert-danger">{loginErrors}</div>
              )}
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>
                <label className="form-label" for="typeEmailX-2">
                  Email
                </label>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    className={
                      'form-control form-control-lg ${formErrors.email?"is-invalid":""}'
                    }
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  {formErrors.password && (
                    <div className="invalid-feedback">
                      {formErrors.password}
                    </div>
                  )}
                </div>

                <label className="form-label" for="typePasswordX-2">
                  Password
                </label>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className={
                      'form-control form-control-lg ${formErrors.password?"is-invalid":""}'
                    }
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                  {formErrors.password && (
                    <div className="invalid-feedback">
                      {formErrors.password}
                    </div>
                  )}
                </div>

                <div className="form-check d-flex justify-content-start mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                  />
                  <label className="form-check-label" for="form1Example3">
                    <span> </span>
                    Remember password{" "}
                  </label>
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                  onClick={handleLogin}
                >
                  Log in
                </button>
              </div>
              <p className="not-a-member-signup text-right mt-2">
                Not A Member ? <span> </span>{" "}
                <Link to="/register">Register Here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
