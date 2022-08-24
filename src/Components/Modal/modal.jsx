import './modal.css';
import CloseIcon from "../../assets/close.svg";
import DarkCLoseIcon from "../../assets/close_dark.svg"
import {  useSelector  } from "react-redux"

const Modal = (props) => {

    const { theme } = useSelector(state=>state.ui)

    const closeModal = () => {
        if (props.closeFunction) {
            props.closeFunction();
        }
    }

    return ( 
        <div className="modal">
            <div className="modal-container" onClick={closeModal}>
                <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                    {props.closeFunction && 
                    <>
                    {theme !== "dark" ? (
                        <span className='close-icon' onClick={closeModal}><img src={DarkCLoseIcon} /></span>
                        
                    ) : (
                        <span className='close-icon' onClick={closeModal}><img src={CloseIcon} /></span>
                    )}
                    </>
                    }
                    {props.children}
                </div>
            </div>
        </div>
    );
}
 
export default Modal;