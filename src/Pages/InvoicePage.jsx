import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InvoiceButton from "../Components/InvoiceButton";


const InvoicePage = ({invoices, account, web3}) => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(false)

    useEffect(()=>{
        const accountInvoice = invoices.find((invoice) => {
            return (invoice.receiver === account || invoice.invoiceCreator === account) && (invoice.invoiceID === id);
        });
        if (accountInvoice) setInvoice({...accountInvoice});
    }, [invoices]);

    const parseDate = (timestamp) => {
        const d = new Date(timestamp);
        return d.toDateString();
    }
  
    return (
        <>
            {invoice ? 
                (<ul>
                    <li><b>Invoice Id:</b><span>{invoice.invoiceID}</span></li>
                    <li><b>Invoice Creator:</b><span>{invoice.invoiceCreator}</span></li>
                    <li><b>Invoice Receiver:</b><span>{invoice.receiver}</span></li>
                    <li><b>Token Address:</b><span>{invoice.tokenAddress}</span></li>
                    <li><b>Amount in Wei:</b><span>{invoice.tokenAmountInWei}</span></li>
                    <li><b>Invoice Paid:</b><span>{invoice.isPaid ? "Yes": "No"}</span></li>
                    <li><b>Invoice Cancelled:</b><span>{invoice.isCancelled ? "Yes" : "No"}</span></li>
                    <li><b>Date Created:</b><span>{parseDate(invoice.createdAt * 1000)}</span></li>
                    <li><b>Date Paid:</b><span>{parseDate(invoice.PaidAt * 1000)}</span></li>
                    <li><InvoiceButton invoice={invoice} web3={web3} account={account} /></li>
                </ul>) : 
                (<h1>You cannot view this Invoice</h1>)
            }
            {invoice.error && <h1>{invoice.error}</h1>}
        </>
    )
}
 
export default InvoicePage;