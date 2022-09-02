import Modal from "../Modal/modal";
import ErrorImage from "../../assets/view-error.png";
import { useNavigate } from "react-router-dom";

import "./cannotviewmodal.css";

const CannotViewModal = () =>{

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
    }

    return(
        <Modal>
            <div className="cannot-view-modal flex flex-col items-center text-center">
                <img src={ErrorImage} alt="" />
                <span className="font-18">You do not have permission to view the contents of this page.</span>
                <button className="xeggo-btn" onClick={handleNavigate} >Go To Dashboard</button>
            </div>
        </Modal>
    )
}
export default CannotViewModal;