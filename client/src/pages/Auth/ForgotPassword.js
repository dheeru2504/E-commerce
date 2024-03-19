import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [Security_Question, setSecurity_Question] = useState("");

  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          Security_Question,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Oops! Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password"}>
      <div className="register">
        <h1>Forgot Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={Security_Question}
              onChange={(e) => setSecurity_Question(e.target.value)}
              className="form-control"
              id="exampleInputSecurity_Question"
              placeholder="What is Your favourite Book Name?"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="New Password"
              required
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
