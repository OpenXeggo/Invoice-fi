import './modal.css';
import CloseIcon from "../../assets/close.svg";


const Modal = (props) => {

    return ( 
        <div className="modal">
            <div className="modal-container">
                <div className="modal-content">
                    {props.closeFunction && <span className='close-icon' onClick={props.closeFunction}><img src={CloseIcon} /></span>}
                    {props.children}
                </div>
            </div>
        </div>
    );
}
 
export default Modal;