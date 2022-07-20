import './modal.css';
import CloseIcon from "../../assets/close.svg";


const Modal = (props) => {

    return ( 
        <div className="modal">
            <div className="modal-container">
                <div className="modal-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
 
export default Modal;