import React, { useContext, useState } from "react";
import "./Signin.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext.js";
import { Link } from "react-router-dom";

function Signin() {
  const [isStudent, setIsStudent] = useState(true);
  const [admissionId, setAdmissionId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useContext(AuthContext);

  const API_URL = "http://localhost:5000/";

  const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    console.log("userCredentials : ", userCredential);
    try {
      const res = await axios.post(API_URL + "api/auth/signin", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log("result :", res);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      setError("Wrong Password Or Username");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    isStudent
      ? loginCall({ admissionId, password }, dispatch)
      : loginCall({ employeeId, password }, dispatch);
  };

  const toggleUserType = () => {
    setIsStudent(!isStudent);
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <form onSubmit={handleFormSubmit}>
          <h2 className="signin-title">Log in</h2>
          <p className="line"></p>
          <div className="persontype-question">
            <p>Are you a {isStudent ? "Student" : "Admin"}?</p>
            <button
              type="button"
              className="toggle-button"
              onClick={toggleUserType}
            >
              {isStudent ? "Student" : "Admin"}
            </button>
          </div>
          <div className="error-message">
            <p>{error}</p>
          </div>
          <div className="signin-fields">
            <label htmlFor={isStudent ? "admissionId" : "employeeId"}>
              <b>{isStudent ? "Admission ID" : "Employee ID"}</b>
            </label>
            <input
              className="signin-textbox"
              type="text"
              placeholder={
                isStudent ? "Enter Admission ID" : "Enter Employee ID"
              }
              value={isStudent ? admissionId : employeeId}
              onChange={(e) =>
                isStudent
                  ? setAdmissionId(e.target.value)
                  : setEmployeeId(e.target.value)
              }
              required
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              className="signin-textbox"
              type="password"
              // minLength="6"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signin-button">
            Log In
          </button>
          <Link to="/forgot-password">
            <p className="mt-2  max-w-max text-md text-blue-100">
              Forgot Password
            </p>
          </Link>
          {/* <a className="forget-pass" href="#home">Forgot password?</a> */}
        </form>
        <div className="signup-option">
          <p className="signup-question">
            Don't have an account? Contact Librarian
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
