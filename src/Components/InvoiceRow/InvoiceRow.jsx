import InvoiceButton from '../InvoiceButton';
import { useNavigate } from 'react-router-dom';
import PlusIcon from '../../assets/plus.svg';
import { ReactComponent as CopyIcon } from '../../assets/copy-icon.svg';
import { ReactComponent as PreviewIcon } from '../../assets/preview-icon.svg';
import { ReactComponent as DownloadIcon } from '../../assets/download-icon.svg';
import { ReactComponent as DelIcon } from '../../assets/delete-icon.svg';
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import moment from "moment";
import StatusIcon from '../StatusIcon/StatusIcon';
import { getParticularInvoice } from '../../utils/dbQueries';


const InvoiceRow = ({invoice, account, contract}) => {

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
    <tr>
        <td>{invoiceData.receiver_name}</td>
        <td>INV-{invoice.invoiceID}</td>
        <td>{date}</td>
        <td>{`${invoiceData?.gross_amount ?? "No name"} ${invoiceData?.token_details?.name ?? "no symbol"}`}</td>
        <td><StatusIcon type={invoiceData.status}/></td>
        <td>
          <CopyIcon className='action-icon' />
          <PreviewIcon className='action-icon' onClick={()=>handleRedirect(invoice.invoiceID)}/>
          <DownloadIcon className='action-icon' />
          <DelIcon className='action-icon' />
        </td>
    </tr>
    );
}
 
export default InvoiceRow;