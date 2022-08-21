import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InvoiceButton from "../Components/InvoiceButton";
import "./CreateInvoice/createinvoice.css";
import moment from 'moment';
import TickIcon from "../assets/tick.svg";
import { getParticularInvoice } from "../utils/dbQueries";


const InvoicePage = ({invoices, account, web3, contract}) => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(false);
    const [invoiceData, setInvoiceData] = useState(false)
    const [dueDate, setDueDate] = useState("");

    const [amounts, setAmounts] = useState([{
        net_amount: 0,
        vat_amount: 0,
        gross_amount: 0
    }])

    const [total, setTotal] = useState({
        net_amount: 0,
        vat_amount: 0,
        gross_amount:0
    })

    // useEffect(()=>{
    //     let total_net = 0, total_vat = 0, total_gross = 0;
    //     // amounts.forEach(amount=>{
    //     //     total_net += amount.net_amount;
    //     //     total_vat += amount.vat_amount;
    //     //     total_gross += amount.gross_amount
    //     // })
    //     // setTotal({
    //     //     net_amount: total_net,
    //     //     vat_amount: total_vat,
    //     //     gross_amount:total_gross
    //     // })
    // },[amounts])

    useEffect(()=>{
        if (invoiceData) {

            let d = new Date(invoiceData.date_due);
            d = moment(d);
            setDueDate(d.format("Do-MMMM-yy"));

            setAmounts(()=>{
                return invoiceData.items?.map((row)=>{
                    let net_amount = row.quantity * row.price;
                    let vat_amount = 0;
                    if (row.vat_rate > 0) vat_amount = net_amount * row.vat_rate / 100;
                    let gross_amount = vat_amount + net_amount;
                    return {net_amount, vat_amount, gross_amount};
                })
            })
        }
    },[invoiceData]);

    useEffect(()=>{
        const accountInvoice = invoices.find((invoice) => {
            return (invoice.receiver === account || invoice.invoiceCreator === account) && (invoice.invoiceID === id);
        });
        if (accountInvoice) setInvoice({...accountInvoice});
    }, [invoices]);

    const handleInvoiceData = async (invoice_id) => {
        try{
            const data = await getParticularInvoice(invoice_id);
            if (data) {
                const {  attributes , id  } = data;
                setInvoiceData({id, ...attributes});
            }
            
        } catch (e){
            console.log(e)
        }
    }

    useEffect(()=>{
        handleInvoiceData(invoice.invoiceID);
    },[invoice])
  
    return (
        <div className="body-container create-container">
            <span className="page-title">Invoice Details</span>
            <span className='page-subtitle'>Invoices/Invoice-Details/INV-{id}</span>
            <div className="page-content">

            <div className="invoice-details flex">
                <div className="left-details flex flex-col">
                    <div className="left-top flex flex-col gap-10">
                        <span className='title'>From:</span>                      
                        <div>
                            <span>Sender Name</span> 
                        </div>
                        <div>
                            <span>Sender Email</span>
                        </div>
                        <div>
                            <span>{account}</span>
                        </div>
                    </div>
                    <div className="left-bottom flex flex-col gap-10">
                        <span>Billed to:</span>
                        <div>
                            <span>{invoiceData.receiver_name}</span> 
                        </div>
                        <div>
                            <span>{invoiceData.receiver_email}</span> 
                        </div>
                        <div>
                            <span>{invoiceData.receiver_address}</span> 
                        </div>
                    </div>
                </div>
                <div className="right-details flex flex-col gap-10">
                    <div>
                        <span>issue #{id}</span>
                    </div>
                    <div>
                        <span>Issued date: {invoiceData.date_created} </span>
                    </div>
                    <div>
                        <span>Payment Date: {dueDate}</span>
                    </div>
                </div>
            </div>
            <div className="token-details">
                <table className='items-table'>
                    <thead>
                        <tr>
                            <th style={{textAlign: "start", minWidth: "300px"}}>Item Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Vat Rate</th>
                            <th>Vat Amount</th>
                            <th>Gross Amount</th>
                        </tr>
                    </thead>
                    {invoiceData.items?.map((row,i) => (
                        <tbody key={i}>
                            <tr>
                                <td><input value={row.item}  type="text" placeholder='Enter Item Description' /></td>
                                <td><input value={row.quantity}  type="number" placeholder='-' className='center-input' /></td>
                                <td><input value={row.price}  type="number" placeholder='-' className='center-input' /></td>
                                <td className='relative'>
                                    <input type="text" value={row.vat_rate}  placeholder='-' className='center-input pr-10' />
                                    <span className='vat' >%</span>
                                </td>
                                <td><input type="number" value={0}  placeholder='-' className='center-input' /></td>
                                <td><input type="number" value={0}  placeholder='-' className='center-input' /></td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className='invoice-summary flex space-between'>
                <div className="notes-container flex flex-col">
                    <span>Notes: </span>
                    <textarea name="notes" id="notes" cols="30" rows="10" 
                        placeholder='Thank you for your business' 
                        className='notes-text' value={invoiceData.notes}
                    ></textarea>
                </div>
                <div className="invoice-total">
                    <div className="invoice-total-item">
                        <span className='label'>Total Net Amount</span>
                        <span>=</span>
                        <span>{total.net_amount}</span>
                    </div>
                    <div className="invoice-total-item">
                        <span className='label'>Total VAT Amount</span>
                        <span>=</span>
                        <span>{total.vat_amount}</span>
                    </div>
                    <div className="invoice-total-item">
                        <span className='label'>Total Gross Amount</span>
                        <span>=</span>
                        <span>{total.gross_amount}</span>
                    </div>
                </div>
            </div>
            <div className="payment-container">
                <div className='flex flex-col gap-30'>
                    <span>Payment Options</span>
                    <div className='flex gap-30 items-center'>
                        <span className="label">Asset:</span>
                        <div className='flex gap-10 flex-wrap'>
                                <div className='select' >
                                    <span>{invoiceData.token_details?.name}</span>
                                    {<span><img src={TickIcon}/></span>}
                                </div>
                        </div>
                    </div>
                    <div className='flex gap-30 items-center'>
                        <span className='label'>Currency:</span>
                        <div className='flex gap-10 flex-wrap'>
                                <div className='select'>
                                    <span>{invoiceData.token_details?.name }</span>
                                    <span><img src={TickIcon}/></span>
                                </div>
                        </div> 
                    </div>
                </div>
                <div className="invoice-buttons">
                    <div className="flex gap-20">
                        <button className='xeggo-btn-outline'>Download as PDF</button>
                        <button className='xeggo-btn' >Cancel Invoice</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
 
export default InvoicePage;