import { useEffect } from "react";
import Modal from "../Modal/modal";

import "./receiptmodal.css"

const ReceiptModal = ({invoice,invoiceData, closeModal}) => {

    useEffect(()=>{
        console.log({invoice, invoiceData}, "This is my invoice data")
    }, [invoice])
    return ( 
        <Modal closeFunction={closeModal}>
            <div className="receipt-modal">
                <div className="mb-50">
                    <div className="weight-600">You have successfully paid for</div>
                    <div className="weight-600">Invoice #{invoiceData.invoice_id}</div>
                </div>
                <div className="modal-nav">
                    <span className="modal-nav-link active">Invoice Details</span>
                </div>
                <div>
                    <div className="flex space-between mb-10">
                        <span className="font-12 line-18 weight-600">Invoice Paid To:</span>
                        <span className="font-12 line-18 weight-600" >{invoiceData.sender_name}</span>
                    </div>
                    <div className="flex space-between mb-10">
                        <span className="font-12 line-18 weight-600">Invoice No:</span>
                        <span className="font-12 line-18 weight-600" >#{invoiceData.invoice_id}</span>
                    </div>
                    <div className="flex space-between mb-10">
                        <span className="font-12 line-18 weight-600">Asset:</span>
                        <span className="font-12 line-18  weight-600" >cUSD(Celo)</span>
                    </div>
                    <div className="flex space-between mb-10">
                        <span className="font-12 line-18 weight-600">Item Description:</span>
                        <span className="font-12 line-18  weight-600" >Amount</span>
                    </div>
                    {invoiceData.items.map(item=>(
                        <div className="flex space-between mb-10">
                            <span className="faded font-12 line-18 weight-600">{item.item} x{item.quantity}:</span>
                            <span className="font-12 line-18 faded weight-600" >{item.price}</span>
                        </div>
                    ))}
                    <div className="flex space-between mb-10">
                        <span className="font-12 line-18 weight-600">Total Net Amount:</span>
                        <span className="font-12 line-18 faded weight-600" >{invoiceData.net_amount}</span>
                    </div>
                    <div className="flex space-between mb-10">
                        <span className="font-12 line-18 weight-600">Total Vat Amount:</span>
                        <span className="font-12 line-18 faded weight-600" >{invoiceData.vat_amount}</span>
                    </div>
                    <div className="flex space-between mb-30">
                        <span className="font-12 line-18 weight-600">Total Gross Amount:</span>
                        <span className="font-12 line-18 faded weight-600" >{invoiceData.gross_amount}</span>
                    </div>
                </div>
                <div className="text-center">
                    <button className="xeggo-btn">Download as PDF</button>
                </div>
            </div>
        </Modal>
    );
}
 
export default ReceiptModal;