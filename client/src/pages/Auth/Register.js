import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirmPassword state
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState(""); // New field
  const [pincode, setPincode] = useState(""); // New field
  const [city, setCity] = useState(""); // New field
  const [state, setState] = useState(""); // New field
  const [securityQuestion, setSecurityQuestion] = useState("");

  const navigate = useNavigate();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const address = `${addressLine1}, ${pincode}, ${city}, ${state}`; // Concatenate address fields

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          securityQuestion,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Oops! Something went wrong");
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="register">
        <h1>Welcome</h1>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex" }}>
            <div className="mb-3 mx-1">
              <input

                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3 mx-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
          </div>





          <div className="mb-3 mx-1 ">
            <input
              style={{ width: "40.5rem" }}
              type="text"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="form-control"
              placeholder="Address Line 1"
              required
            />
          </div>



          <div style={{ display: "flex" }}>
            <div className="mb-3 mx-1">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="form-control"
                placeholder="Pincode"
                required
              />
            </div>

            <div className="mb-3 mx-1">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-control"
                placeholder="City"
                required
              />
            </div>

          </div>
          <div style={{ display: "flex" }}>
            <div className="mb-3 mx-1">
              <select
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select State</option>
                {indianStates.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3 mx-1">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder="Phone"
                required
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="mb-3 mx-1">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-3 mx-1">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="mb-3 mx-1">
              <input
                type="text"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                className="form-control"
                placeholder="What is Your Favourite Book?"
                required
              />
            </div>
          </div>


          <button type="submit" className="btn btn-info btn-block">
            Submit
          </button>
        </form>
        <Link className="m-4" to="/login" style={{ textDecoration: "none", color: "grey" }}> Login</Link>
      </div>
      <p style={{ textAlign: "center" }}>All Fields are required *</p>
    </Layout>
  );
};

export default Register;




const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];