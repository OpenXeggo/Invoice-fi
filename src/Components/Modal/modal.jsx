import './modal.css';
import CloseIcon from "../../assets/close.svg";


const Modal = (props) => {

    const closeModal = () => {
        if (props.closeFunction) {
            props.closeFunction();
        }
    }

    return ( 
        <div className="modal">
            <div className="modal-container" onClick={closeModal}>
                <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                    {props.closeFunction && <span className='close-icon' onClick={closeModal}><img src={CloseIcon} /></span>}
                    {props.children}
                </div>
            </div>
        </div>
    );
}
 
export default Modal;