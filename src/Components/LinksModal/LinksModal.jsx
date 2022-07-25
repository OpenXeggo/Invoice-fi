import Modal from "../Modal/modal";
import "./linksmodal.css";

const LinksModal = ({closeModal, link}) => {
    return ( 
        <Modal closeFunction={closeModal} >
            <div className="links-container">
                <div>
                    <span className="headline font-16 line-24 weight-600">Your payment link has been generated</span>
                </div>
                <div className="modal-nav">
                    <span className="modal-nav-link active">Share Link</span>
                    <span className="modal-nav-link ">Download</span>
                </div>
                <div className="mb-20">
                    <span className="font-12 line-18 width-230 inline-block">Share the payment link by copying the web address below</span>
                </div>
                <div className="flex gap-10 mb-30">
                    <input className="link-box" type="text" disabled value={link} />
                    <button className="xeggo-button" onClick={()=>navigator.clipboard.writeText(link)}>Copy</button>
                </div>
                <div>
                    <span className="font-10 line-15 underline pointer">Preview in a new tab</span>
                </div>
            </div>
        </Modal>
    );
}
 
export default LinksModal;