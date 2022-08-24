import {  NavLink  } from "react-router-dom";
import { useRef } from "react";
import {  useLocation  } from "react-router-dom";
import { useMoralis } from "react-moralis";


import InvoiceIcon from "../../assets/icons/InvoiceIcon";
import { useEffect } from "react";
import HomeIcon from "../../assets/icons/HomeIcon"
import SettingsIcon from "../../assets/icons/SettingsIcon";
import FaqIcon from "../../assets/icons/FaqIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import DownIcon from "../../assets/icons/DownIcon";

import "./sidebar.css";

const Sidebar = () => {

    const location = useLocation();
    const createButton = useRef();
    const manageButton = useRef();

    const { Moralis } = useMoralis();

    useEffect(()=>{
        const invoiceBtns = [createButton, manageButton];

        const active = invoiceBtns.some(e=>e.current.classList.contains("active"));
        if (active) {
            createButton.current.parentElement.previousElementSibling.classList.add("active");
        }
        else {
            createButton.current.parentElement.previousElementSibling.classList.remove("active");
        }
    },[location])

    const handleDropDown = (e) => {
        const dropdown = e.currentTarget.nextElementSibling;
        dropdown.classList.toggle("show");
    }

    const handleLogout = () => {
        localStorage.removeItem("wallet_type")
        Moralis.User.logOut();
        window.location.reload();
    }


    return ( 
        <div className="sidebar-container">
            <div className="sidebar-content">
                <div className="sidebar-top">
                    <NavLink to={'/'} className="nav-link">     
                        <HomeIcon />
                        <span className="nav-link-text">Home</span>
                    </NavLink>

                    <div className="nav-link-dropdown">
                        <div className="nav-link" onClick={(e)=>handleDropDown(e)}>
                            <InvoiceIcon />
                            <span className="nav-link-text">Invoices</span>
                            <span className="nav-link-icon"> <DownIcon /> </span>
                        </div>
                        <div className="nav-link-items drop-items ">
                            <NavLink className="drop-down-link" to={'/create'} ref={createButton}>
                                New Invoice
                            </NavLink>
                            <NavLink className="drop-down-link" to={'/invoices'} ref={manageButton}>
                                Manage Invoice
                            </NavLink>
                        </div>
                    </div>

                    <NavLink to={'/settings'} className="nav-link">     
                        <SettingsIcon />
                        <span className="nav-link-text">Settings</span>
                    </NavLink>
                    
                </div>
                <div className="sidebar-bottom">
                    <NavLink to={'/faq'} className="nav-link">     
                        <FaqIcon />
                        <span className="nav-link-text">FAQs</span>
                    </NavLink>
                    <span to={'/faq'} className="nav-link" onClick={handleLogout}>     
                        <LogoutIcon />
                        <span className="nav-link-text">Log-Out</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;