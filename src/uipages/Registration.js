import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [rolename, setrolename] = useState("");
  //const[formErros,setformErrors]=useState({});
  const resetPage = () => {
    toast.error("All input fields must be filled!!!");
    navigate("/register");
  };
  const handleSubmit = async () => {
    //e.preventDefault();
    try {
      //const jwttoken = localStorage.getItem("jwttoken");
      const userData = {
        name: name,
        email: email,
        password: password,
        rolename: rolename,
      };
      const response = await axios.post(
        "http://localhost:8090/sign-up",
        userData
      );

      console.log("Registration Successful", response.data);

      toast.success("Registration Success");
      //localStorage.setItem("name", name);
      console.log(localStorage.getItem("name"));
      rolename.toUpperCase() === "ADMIN"
        ? navigate("/policy")
        : navigate("/displaypolicy");
      setname("");
      setemail("");
      setpassword("");
      setrolename("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        navigate("/register");
        console.log(
          "User with this name already exists Register with a another username"
        );
        toast.error("User with this name already exists");
        toast.info("Register with a another username");
      } else {
        console.error(error.message);
        toast.error("Please try again");
      }
    }
  };
  return (
    <section className="vh-100 " style={{ backgroundcolor: "#eee" }}>
      <div className="container h-80">
        <div className="row d-flex justify-content-center align-items-center h-20">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderradius: "25px" }}>
              <div className="card-body p-md">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                          />
                          <label
                            className="form-label"
                            for="form3Example1c validationDefault01"
                          >
                            Your Name
                          </label>
                          <div class="valid-feedback">Looks good!</div>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                          />
                          <label className="form-label" for="form3Example3c">
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                          />
                          <label className="form-label" for="form3Example4c">
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <select
                            type="email"
                            id="form3Example3D"
                            className="form-control"
                            value={rolename}
                            onChange={(e) => setrolename(e.target.value)}
                          >
                            <option value={""}>Select Role</option>
                            <option value={"USER"}>USER</option>
                            <option value={"AGENT"}>AGENT</option>
                            <option value={"ADMIN"}>ADMIN</option>
                          </select>

                          <label className="form-label" for="form3Example3D">
                            Role Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={() => {
                            if (
                              name.trim() !== "" &&
                              password.trim() !== "" &&
                              email.trim() !== "" &&
                              rolename.trim() !== ""
                            ) {
                              {
                                handleSubmit();
                              }
                            } else {
                              resetPage();
                            }
                          }}
                        >
                          Register
                        </button>
                      </div>
                      <div>
                        <label>
                          Already a user ? <a href="/">Login</a>
                        </label>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Registration;
