import React, { useContext, useEffect, useState } from "react";
import "../AdminDashboard/AdminDashboard.css";
import "./MemberDashboard.css";
import { FaHistory } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GiArchiveResearch } from "react-icons/gi";
import { LuFileSearch } from "react-icons/lu";
import { RiReservedLine } from "react-icons/ri";

import { GoIssueClosed } from "react-icons/go";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import moment from "moment";
import BookSearch from "./BookSearch";
import userImage from "../../../assets/image.png"

function MemberDashboard() {
  const [active, setActive] = useState("profile");
  const [sidebar, setSidebar] = useState(false);

  const API_URL = "http://localhost:5000/";
  const { user } = useContext(AuthContext);
  const [memberDetails, setMemberDetails] = useState(null);
  

  useEffect(() => {
    const getMemberDetails = async () => {
      try {
        const response = await axios.get(
          API_URL + "api/users/getuser/" + user._id
        );
        setMemberDetails(response.data);
      } catch (err) {
        console.log("Error in fetching the member details");
      }
    };
    getMemberDetails();
  }, [API_URL, user]);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
          
        </div>
        <div
          className={sidebar ? "dashboard-options active" : "dashboard-options"}
        >
          <div className="dashboard-logo">
          
            <p className="logo-name">Library</p>
          </div>
          <a
            href="#profile@member"
            className={`dashboard-option ${
              active === "profile" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("profile");
              setSidebar(false);
            }}
          >
            <span>< FaUser className="dashboard-option-icon"  /></span>
            
            Profile
          </a>
          <a
            href="#searchBook"
            className={`dashboard-option ${
              active === "search" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("search");
              setSidebar(false);
            }}
          >
            <span><LuFileSearch className="dashboard-option-icon" /></span>
            
            Search
          </a>

          <a
            href="#activebooks@member"
            className={`dashboard-option ${
              active === "active" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("active");
              setSidebar(false);
            }}
          >
            <span><GoIssueClosed className="dashboard-option-icon" /></span>
            Active
          </a>
          <a
            href="#reservedbook@member"
            className={`dashboard-option ${
              active === "reserved" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("reserved");
              setSidebar(false);
            }}
          >
            <span><RiReservedLine className="dashboard-option-icon" /></span>
            
            Reserved
          </a>
          <a
            href="#history@member"
            className={`dashboard-option ${
              active === "history" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("history");
              setSidebar(false);
            }}
          >
            <span><FaHistory className="dashboard-option-icon" /></span>
            
            History
          </a>
          <a
            href="#profile@member"
            className={`dashboard-option ${
              active === "logout" ? "clicked" : ""
            }`}
            onClick={() => {
              logout();
              setSidebar(false);
            }}
          >
            <span><RiLogoutCircleLine className="dashboard-option-icon" /></span>
            
            Log out{" "}
          </a>
        </div>

        <div className="dashboard-option-content">
          <div className="member-profile-content" id="profile@member">
            <div className="user-details-topbar">
              <img
                className="user-profileimage"
                src={userImage}
                alt="userImage"
              ></img>
              <div className="user-info">
                            <p className="user-name">{memberDetails?.userFullName}</p>
                            <p className="user-id">{memberDetails?.userType === "Student" ? memberDetails?.admissionId : memberDetails?.employeeId}</p>
                            <p className="user-email">{memberDetails?.email}</p>
                            <p className="user-phone">{memberDetails?.mobileNumber}</p>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ display: "flex", flex: "0.5", flexDirection: "column" }}>
                                    <span style={{ fontSize: "18px" }}>
                                        <b>Age</b>
                                    </span>
                                    <span style={{ fontSize: "16px" }}>
                                    {memberDetails?.age}
                                    </span>
                                </p>
                                <p style={{ display: "flex", flex: "0.5", flexDirection: "column" }}>
                                    <span style={{ fontSize: "18px" }}>
                                        <b>Gender</b>
                                    </span>
                                    <span style={{ fontSize: "16px" }}>
                                    {memberDetails?.gender}
                                    </span>
                                </p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                                <p style={{ display: "flex", flex: "0.5", flexDirection: "column" }}>
                                    <span style={{ fontSize: "18px" }}>
                                        <b>DOB</b>
                                    </span>
                                    <span style={{ fontSize: "16px" }}>
                                        {memberDetails?.dob}
                                    </span>
                                </p>
                                <p style={{ display: "flex", flex: "0.5", flexDirection: "column" }}>
                                    <span style={{ fontSize: "18px" }}>
                                        <b>Address</b>
                                    </span>
                                    <span style={{ fontSize: "16px" }}>
                                        {memberDetails?.address}
                                    </span>
                                </p>
                            </div>
                        </div>
              
            </div>
           
          </div>

          <div>
              
              {/* Conditional rendering of SearchBook component */}
           {active === "search" && (
            <div className="search-book-container" id="searchBook">
              <BookSearch studentName={memberDetails?.userFullName} borrowerId={memberDetails._id} borrowerEmail={memberDetails?.email}/>
            </div>
          )}

          </div>
           


          <div className="member-activebooks-content" id="activebooks@member">
            <p className="member-dashboard-heading">Issued</p>
            <table className="activebooks-table">
              <tr>
                <th>S.No</th>
                <th>Book-Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Fine</th>
              </tr>
              {memberDetails?.activeTransactions
                ?.filter((data) => {
                  return data.transactionType === "Issued";
                })
                .map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.bookName}</td>
                      <td>{data.fromDate}</td>
                      <td>{data.toDate}</td>
                      <td>
                        {Math.floor(
                          (Date.parse(moment(new Date()).format("MM/DD/YYYY")) -
                            Date.parse(data.toDate)) /
                            86400000
                        ) <= 0
                          ? 0
                          : Math.floor(
                              (Date.parse(
                                moment(new Date()).format("MM/DD/YYYY")
                              ) -
                                Date.parse(data.toDate)) /
                                86400000
                            ) * 10}
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>

         

          <div
            className="member-reservedbooks-content"
            id="reservedbooks@member"
          >
            <p className="member-dashboard-heading">Reserved</p>
            <table className="activebooks-table">
              <tr>
                <th>S.No</th>
                <th>Book-Name</th>
                <th>From</th>
                <th>To</th>
              </tr>
              {memberDetails?.activeTransactions
                ?.filter((data) => {
                  return data.transactionType === "Reserved";
                })
                .map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.bookName}</td>
                      <td>{data.fromDate}</td>
                      <td>{data.toDate}</td>
                    </tr>
                  );
                })}
            </table>
          </div>
          <div className="member-history-content" id="history@member">
            <p className="member-dashboard-heading">History</p>
            <table className="activebooks-table">
              <tr>
                <th>S.No</th>
                <th>Book-Name</th>
                <th>From</th>
                <th>To</th>
                <th>Return Date</th>
              </tr>
              {memberDetails?.prevTransactions?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.bookName}</td>
                    <td>{data.fromDate}</td>
                    <td>{data.toDate}</td>
                    <td>{data.returnDate}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
