import { useState } from "react";
import SideIcon from "../../assets/side.svg";
import ProfileIcon from "../../assets/profile.svg";
import { modifyAddress } from "../../utils/modifyAddress";
import Modal from "../Modal/modal";
import { addUser } from "../../utils/dbQueries";

import "./profiledetails.css";

const ProfileDetails = ({ closeModal, account, setUser }) => {
  const [profileData, setProfileData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    walletAddress: account,
    invoices: [],
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const addUserHandler = async () => {
    try {
      const result = await addUser(profileData);
      localStorage.setItem("invoiceUser", JSON.stringify(result));
      setUser(result.toJSON());
      closeModal();
    } catch (e) {}
  };

  return (
    <Modal>
      <div className="details-container flex flex-col justify-center gap-20">
        <div className="text-center">
          <span className="font-20 line-30 weight-600">
            You are connected!!
          </span>
        </div>
        <div className="text-center">
          <img src={ProfileIcon} alt="" width="70px" height="70px" />
          <div className="address-box flex gap-5 items-center">
            <div className="green-button"></div>
            <span>{modifyAddress(account)}</span>
          </div>
        </div>
        <div>
          <span className="font-14 line-21 weight-600">
            Complete your information
          </span>
          <div className="modal-inputs">
            <input
              type="text"
              placeholder="Username"
              className="modal-input"
              name="username"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder="First Name"
              className="basis-45 modal-input"
              name="firstName"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="basis-45 modal-input"
              name="lastName"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder="Email"
              className="modal-input"
              name="email"
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="modal-button">
          <button
            className="flex items-center justify-center gap-15"
            onClick={addUserHandler}
          >
            Get Started <img src={SideIcon} />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileDetails;
