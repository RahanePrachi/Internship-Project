import React, { useState } from 'react'
import "./AdminDashboard.css"
import AddTransaction from './Components/AddTransaction';
import AddMember from './Components/AddMember';
import AddBook from './Components/AddBook';
import { ImBook } from "react-icons/im";
import { BiSolidBookReader } from "react-icons/bi";
import { MdAssignmentReturn } from "react-icons/md";
import GetMember from './Components/GetMember';
import { FaUserPlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { HiBuildingLibrary } from "react-icons/hi2";

import Return from './Components/Return';



/* Semantic UI Dropdown Styles Import */
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function AdminDashboard() {

    const [active, setActive] = useState("addbooks")
    const [sidebar, setSidebar] = useState(false)

    /* Logout Function*/
    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }


    return (
        <div className="dashboard ">
            <div className="dashboard-card gap-3 mt-[45px]">
                <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
                    
                        {/* {sidebar ? <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} /> : <DoubleArrowIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />} */}
                    
                </div>

                {/* Sidebar */}
                <div className={sidebar ? "dashboard-options active" : "dashboard-options"}>
                    <div className='dashboard-logo flex flex-col items-center justify-center'>
                    <HiBuildingLibrary style={{ fontSize: 50 }}/>
                        <p className="logo-name">Library</p>
                    </div>
                   
                    <p className={`dashboard-option ${active === "addbook" ? "clicked" : ""}`} onClick={() => { setActive("addbook"); setSidebar(false) }}>
                    <span ><ImBook className="dashboard-option-icon" /></span> Add Book</p>
                    <p className={`dashboard-option ${active === "addtransaction" ? "clicked" : ""}`} onClick={() => { setActive("addtransaction"); setSidebar(false) }}><span ><BiSolidBookReader className="dashboard-option-icon"  /></span> Add Transaction </p>
                    <p className={`dashboard-option ${active === "getmember" ? "clicked" : ""}`} onClick={() => { setActive("getmember"); setSidebar(false) }}> <span ><FaUserCircle className="dashboard-option-icon" /></span> Get Member </p>
                    <p className={`dashboard-option ${active === "addmember" ? "clicked" : ""}`} onClick={() => { setActive("addmember"); setSidebar(false) }}><span ><FaUserPlus className="dashboard-option-icon" /></span> Add Member </p>
                    <p className={`dashboard-option ${active === "returntransaction" ? "clicked" : ""}`} onClick={() => { setActive("returntransaction"); setSidebar(false) }}><span ><MdAssignmentReturn className="dashboard-option-icon" /></span>  Return </p>
                    <p className={`dashboard-option`} onClick={logout}><span ><RiLogoutCircleLine className="dashboard-option-icon" /></span> Log out </p>

                </div>
                <div className="dashboard-option-content ">
                    <div className="dashboard-addbooks-content" style={active !== "addbook" ? { display: 'none' } : {}}>
                        <AddBook />
                    </div>
                    <div className="dashboard-transactions-content" style={active !== "addtransaction" ? { display: 'none' } : {}}>
                        <AddTransaction />
                    </div>
                    <div className="dashboard-addmember-content" style={active !== "addmember" ? { display: 'none' } : {}}>
                        <AddMember />
                    </div>
                    <div className="dashboard-addmember-content" style={active !== "getmember" ? { display: 'none' } : {}}>
                        <GetMember />
                    </div>
                    <div className="dashboard-addmember-content" style={active !== "returntransaction" ? { display: 'none' } : {}}>
                        <Return />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;