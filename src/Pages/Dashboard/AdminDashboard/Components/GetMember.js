import React, { useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import '../../MemberDashboard/MemberDashboard.css'
import moment from "moment"
import userImage from "../../../../assets/image.png"

function GetMember() {

    const API_URL = "http://localhost:5000/";

    const [allMembersOptions, setAllMembersOptions] = useState(null)
    const [memberId, setMemberId] = useState(null)
    const [memberDetails, setMemberDetails] = useState(null)

    //Fetch Members
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/users/allmembers")
                setAllMembersOptions(response.data.map((member) => (
                    { value: `${member?._id}`, text: `${member?.userType === "Student" ? `${member?.userFullName}[${member?.admissionId}]` : `${member?.userFullName}[${member?.employeeId}]`}` }
                )))
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])


    useEffect(() => {
        const getMemberDetails = async () => {
            if(memberId !== null){
                try {
                    const response = await axios.get(API_URL + "api/users/getuser/" + memberId)
                    setMemberDetails(response.data)
                }
                catch (err) {
                    console.log("Error in fetching the member details")
                }
            }
        }
        getMemberDetails()
    }, [API_URL, memberId])


    return (
        <div>
            <div className='semanticdropdown getmember-dropdown'>
                <Dropdown
                    placeholder='Select Member'
                    fluid
                    search
                    selection
                    value={memberId}
                    options={allMembersOptions}
                    onChange={(event, data) => setMemberId(data.value)}
                />
            </div>
            <div style={memberId === null ? { display: "none" } : {}}>
                <div className="member-profile-content" id="profile@member" style={memberId === null ? { display: "none" } : {}}>
                    <div className="user-details-topbar">
                        <img className="user-profileimage" src={userImage} alt=""></img>
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

                <div className="member-activebooks-content" id="activebooks@member">
                    <p style={{ fontWeight: "bold", fontSize: "22px", marginTop: "22px", marginBottom: "22px" }}>Issued</p>
                    <table className="activebooks-table">
                        <tr>
                            <th>S.No</th>
                            <th>Book-Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Fine</th>
                        </tr>
                        {
                            memberDetails?.activeTransactions?.filter((data) => {
                                return data.transactionType === "Issued"
                            }).map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.bookName}</td>
                                        <td>{data.fromDate}</td>
                                        <td>{data.toDate}</td>
                                        <td>{(Math.floor((Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate)) / 86400000)) <= 0 ? 0 : (Math.floor((Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate)) / 86400000)) * 10}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>

                <div className="member-reservedbooks-content" id="reservedbooks@member">
                    <p style={{ fontWeight: "bold", fontSize: "22px", marginTop: "22px", marginBottom: "22px" }}>Reserved</p>
                    <table className="activebooks-table">
                        <tr>
                            <th>S.No</th>
                            <th>Book-Name</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                        {
                            memberDetails?.activeTransactions?.filter((data) => {
                                return data.transactionType === "Reserved"
                            }).map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{data.bookName}</td>
                                        <td>{data.fromDate}</td>
                                        <td>{data.toDate}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                <div className="member-history-content" id="history@member">
                    <p style={{ fontWeight: "bold", fontSize: "22px", marginTop: "22px", marginBottom: "22px" }}>History</p>
                    <table className="activebooks-table">
                        <tr>
                            <th>S.No</th>
                            <th>Book-Name</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Return Date</th>
                        </tr>
                        {
                            memberDetails?.prevTransactions?.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{data.bookName}</td>
                                        <td>{data.fromDate}</td>
                                        <td>{data.toDate}</td>
                                        <td>{data.returnDate}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GetMember
