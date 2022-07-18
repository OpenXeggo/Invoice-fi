import ProfileIcon from "../../assets/profile.svg";
import CloseIcon from "../../assets/close.svg";
import SideIcon from "../../assets/side.svg";

import "./profiledetails.css";

const ProfileDetails = ({closeModal}) => {

    return ( 
        <div className="modal">
            <div className="modal-container">
                <div className="modal-content flex flex-col justify-center gap-20">
                    <span className="close-modal" ><img onClick={closeModal} src={CloseIcon}/></span>
                    <div className="text-center" >
                        <span className="font-20 line-30 weight-600">You are connected!!</span>
                    </div>
                    <div className="text-center">
                        <img src={ProfileIcon} alt="" width="70px" height="70px" />
                        <div className="address-box flex gap-5 items-center">
                            <div className="green-button"></div>
                            <span>Ox30303030</span>
                        </div>
                    </div>
                    <div>
                        <span className="font-14 line-21 weight-600" >Complete your information</span>
                        <div className="modal-inputs">
                            <input type="text" placeholder="Username" className="modal-input"/>
                            <input type="text" placeholder="First Name" className="basis-45 modal-input" />
                            <input type="text" placeholder="Last Name" className="basis-45 modal-input" />
                            <input type="text" placeholder="Email" className="modal-input" />
                        </div>
                    </div>
                    <div className="modal-button">
                        <button className="flex items-center justify-center gap-15">Get Started <img src={SideIcon} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ProfileDetails;