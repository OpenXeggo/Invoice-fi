import InvoiceButton from '../InvoiceButton';
import { useNavigate } from 'react-router-dom';
import PlusIcon from '../../assets/plus.svg';
import { ReactComponent as CopyIcon } from '../../assets/copy-icon.svg';
import { ReactComponent as PreviewIcon } from '../../assets/preview-icon.svg';
import { ReactComponent as DownloadIcon } from '../../assets/download-icon.svg';
import { ReactComponent as DelIcon } from '../../assets/delete-icon.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye.svg';
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import moment from "moment";
import StatusIcon from '../StatusIcon/StatusIcon';
import { getParticularInvoice } from '../../utils/dbQueries';


const InvoiceRow = ({invoice, account, contract, page}) => {

    const { Moralis } = useMoralis();
    const navigate = useNavigate();

    const date = moment(invoice.createdAt * 1000).format("DD-MM-YYYY");

    const [invoiceData, setInvoiceData] = useState({
        receiver_name:"",
        status:"",
    });

    const deleteInvoice = () => {
        
    }

    const copyInvoice = () => {
      
    }

    const downloadInvoice = () => {
      
    }

    const handleRedirect = (id) => {
        navigate(`/invoices/${id}`);
    }

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
        handleInvoiceData(invoice.invoiceID)
    },[])

    useEffect(()=>{
        console.log(invoiceData)
    },[invoiceData])

    return ( 
        <>
        {page === "manage" ? (
            <tr>
                <td>{invoiceData.receiver_name}</td>
                <td>INV-{invoice.invoiceID}</td>
                <td>{date}</td>
                <td>{`${invoiceData?.gross_amount ?? "No name"} ${invoiceData?.token_details?.name ?? "no symbol"}`}</td>
                <td><StatusIcon invoice={invoice}/></td>
                <td>
                  <CopyIcon className='action-icon' />
                  <EyeIcon className='action-icon' onClick={()=>handleRedirect(invoice.invoiceID)}/>
                  <DownloadIcon className='action-icon' />
                  <DelIcon className='action-icon' />
                </td>
            </tr>
        ) : (
            <tr>
                <td>{invoiceData.receiver_name}</td>
                <td>
                    <div className='weight-400 font-12 line-18 gradient-text pointer' 
                    onClick={()=>handleRedirect(invoice.invoiceID)}
                    >View Invoice</div>
                    <div>INV-{invoice.invoiceID}</div>
                </td>
                <td>{date}</td>
                <td>{`${invoiceData?.gross_amount ?? "No name"} ${invoiceData?.token_details?.name ?? "no symbol"}`}</td>
                <td><StatusIcon invoice={invoice} /></td>
            </tr>
        )}
        </>
    );
}
 
export default InvoiceRow;