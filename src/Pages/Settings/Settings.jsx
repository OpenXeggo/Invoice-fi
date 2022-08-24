import { useState } from "react";
import "./settings.css";
import DiskIcon from "../../assets/disk.svg";
import UploadIcon from "../../assets/upload.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { initObject } from "../../utils/dbQueries";


const Settings = () => {

    const { address } = useSelector(state=>state.user)
    const { username, firstname, lastname, email } = useSelector(state=>state.user.userData);
    const { Moralis } = useMoralis();
    const dispatch = useDispatch();

    const [saved, setSaved] = useState(false)

    const editUserData = (data) => {
        return new Promise(async (resolve, reject)=>{
            try{
              const { query } = initObject("user");
              const user = await query.equalTo("walletAddress", address).first();
              const result = await user.set(data).save()
              console.log(result); 
              resolve (result);
            } catch (e){
              reject(e);
            }
          })
    }

    const handleUserEdit = async () => {
        try{
            const user = editUserData(userData);
            console.log(user);
            dispatch({type: "EDIT_USER_DATA", payload: userData});
            setSaved(true);
            setTimeout(()=>{
                setSaved(false)
            }, 5000)
        } catch(e){
            console.log(e);
            setSaved(false);
        }
    }

    const [userData, setUserData] = useState({
        username: "",
        firstname: "", 
        lastname: "", 
        email: ""
    })

    useEffect(()=>{
        setUserData({
                username,
                firstname, 
                lastname, 
                email
        })
    },[username])

    const [page, setPage] = useState("profile");
    const [toggle, setToggle] = useState(false);

    const handleClick = () => setToggle(toggle=>!toggle);

    const handleChange = (e, type) =>{
        setUserData(userData=>{
            return {
                ...userData, 
                [type]: e.target.value
            }
        })
    }

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
                                <input type="text" id="firstname" name="firstname"
                                value={userData.firstname}
                                onChange={(e)=>{handleChange(e, "firstname")}}
                                 />
                            </div>
                            <div className="account-input">
                                <label htmlFor="lastname">Last Name (Required)</label>
                                <input type="text" id="lastname" name="lastname"
                                value={userData.lastname}
                                onChange={(e)=>{handleChange(e, "lastname")}}
                                />
                            </div>
                            <div className="account-input">
                                <label htmlFor="username">Username (Required)</label>
                                <input type="text" id="username" name="username"
                                value={userData.username}
                                onChange={(e)=>{handleChange(e, "username")}}
                                />
                            </div>
                            <div className="account-input">
                                <label htmlFor="email">Email Address (Required)</label>
                                <input type="text" id="email" name="email" 
                                value={userData.email}
                                onChange={(e)=>{handleChange(e, "email")}}
                                />
                            </div>
                            <div className="account-input full">
                                <label htmlFor="address">Wallet Address (Required)</label>
                                <input type="text" id="address" name="address"
                                value={address}
                                />
                            </div>
                            <div className="w-full flex items-center justify-end mb-150 gap-20">
                                {saved && <span className="saved-info">Changes Saved!!!</span>}
                                <button className='primary-btn' onClick={handleUserEdit}>
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