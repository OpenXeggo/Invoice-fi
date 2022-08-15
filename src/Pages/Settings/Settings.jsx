import { useState } from "react";
import "./settings.css";
import DiskIcon from "../../assets/disk.svg";
import UploadIcon from "../../assets/upload.svg";

const Settings = () => {

    const [page, setPage] = useState("profile");
    const [toggle, setToggle] = useState(false);

    const handleClick = () => setToggle(toggle=>!toggle);

    return ( 
        <div className="body-container create-container">
            <span className="page-title">My Account</span>
            <span className='page-subtitle'>Invoices/Settings/My-account</span>
            <div className="settings-page-content">
                <div className="account-navbar">
                    <div className={page === "profile" ? "account-nav-link active" : "account-nav-link"} onClick={()=>setPage("profile")}>
                        <span className="weight-500 font-16 line-24">Profile</span>
                    </div>
                    <div className={page === "company" ? "account-nav-link active" : "account-nav-link"} onClick={()=>setPage("company")}>
                        <span className="weight-500 font-16 line-24">Company Info</span>
                    </div>
                </div>
                <>
                {page === "profile" ? (
                    <div className="account-page-container">
                        <div className="account-form-container">
                            <div className="account-input">
                                <label htmlFor="firstname">First Name (Required)</label>
                                <input type="text" id="firstname" name="firstname" />
                            </div>
                            <div className="account-input">
                                <label htmlFor="lastname">Last Name (Required)</label>
                                <input type="text" id="lastname" name="lastname" />
                            </div>
                            <div className="account-input">
                                <label htmlFor="username">Username (Required)</label>
                                <input type="text" id="username" name="username" />
                            </div>
                            <div className="account-input">
                                <label htmlFor="email">Email Address (Required)</label>
                                <input type="text" id="email" name="email" />
                            </div>
                            <div className="account-input full">
                                <label htmlFor="address">Wallet Address (Required)</label>
                                <input type="text" id="address" name="address" />
                            </div>
                            <div className="w-full">
                                <button className='primary-btn mx-right'>
                                    <img src={DiskIcon} alt='small icon'/>
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </div>
                    </div> 
                ) : (
                    <div className="company-info-container">
                        <div className="flex gap-30 items-center mb-50">
                            <div className="company-logo-container"></div>
                            <div>
                                <div className="mb-15">
                                    <span className="weight-500 font-16 line-24">Add Your Company Logo</span>
                                </div>
                                <div className="upload-button">
                                    <img src={UploadIcon} alt="" />
                                    <span className="font-14 weight-500 line-21">Upload</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-20">
                            <span className="weight-500 ">Use Company Information for Invoices</span>
                            <div className="toggle" onClick={handleClick} >
                                <div className={toggle ? "toggle-right" : "toggle-left" } ></div>
                            </div>
                        </div>
                        <div className="account-form-container">
                            <div className="account-input">
                                <label htmlFor="email">Company Name (Required)</label>
                                <input type="text" id="email" name="email" />
                            </div>
                            <div className="account-input">
                                <label htmlFor="email">Company Address (Required)</label>
                                <input type="text" id="email" name="email" />
                            </div>
                            <div className="account-input full">
                                <label htmlFor="address">Address Line (Required)</label>
                                <input type="text" id="address" name="address" />
                            </div>
                            <div className="w-full">
                                <button className='primary-btn mx-right'>
                                    <img src={DiskIcon} alt='small icon'/>
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                </>
            </div>
        </div>
    );
}
 
export default Settings;