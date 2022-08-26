import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceButton from '../../Components/InvoiceButton';
import Token from '../../Token.json';
import { initWeb3 } from '../../utils/init';
import Button from '../../Components/Button/Button';
import PlusIcon from '../../assets/plus.svg';
import { ReactComponent as CopyIcon } from '../../assets/copy-icon.svg';
import { ReactComponent as PreviewIcon } from '../../assets/preview-icon.svg';
import { ReactComponent as DownloadIcon } from '../../assets/download-icon.svg';
import { ReactComponent as DelIcon } from '../../assets/delete-icon.svg';
import './ManageInvoice.css'
import StatusIcon from '../../Components/StatusIcon/StatusIcon';
import InvoiceRow from '../../Components/InvoiceRow/InvoiceRow';


const ManageInvoice = ({invoices, account,contract}) => {

  const navigate = useNavigate();

    const web3 = initWeb3();
    const [accountInvoices, setAccountInvoices] = useState([]);

    const filterAccountInvoices = ()=>{
      return invoices.filter((invoice) => {
        return invoice.receiver === account || invoice.invoiceCreator === account;
      });
    }

    const getTokenSymbol = async (tokenAddress) => {
      try{
        const token = new web3.eth.Contract(Token, tokenAddress);
        const tokenSymbol = await token.methods.symbol().call();
        return {tokenSymbol};
      }
      catch (err) {
        return {tokenSymbol: "invalid"}
      }
    }

    const checkAddress = (address) => {
      const isAddress = web3.utils.isAddress(address);
      return isAddress;
    }
  
    useEffect(()=>{
      if(invoices.length) {
        const filteredInvoices = filterAccountInvoices(invoices);

        const parseInvoices = async (invoiceList) => {
          if(invoiceList.length){
            for (let i = 0; i < invoiceList.length; i++){
              if(checkAddress(invoiceList[i].tokenAddress)) {
                let { tokenSymbol } = await getTokenSymbol(invoiceList[i].tokenAddress);
                invoiceList[i] = {...invoiceList[i],tokenSymbol };
              }
              else{
                let  tokenSymbol  = "invalid";
                invoiceList[i] = {...invoiceList[i],tokenSymbol };
              }
              
            }
            return invoiceList;
          }
        }

        const setInvoices = async () => {
          const parsedInvoice = await parseInvoices(filteredInvoices);
          setAccountInvoices(parsedInvoice);
        }

        setInvoices();
        
      }
    },[invoices])

    return (
        <div className='body-container'>
            <div className='display-flex-row'>
                <div className=''>
                    <span className='page-title'>Manage Invoices</span>
                    <span className='page-subtitle'>Invoices/Manage-Invoices</span>
                </div>
                <Button 
                    Icon={PlusIcon} 
                    text={"Create Invoice"} clickHandler={()=>navigate("/create")}
                />
            </div>
            <div className="page-content content m-t-b">
                <div className="table-container w-h">
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Invoice No</th>
                        <th>Issue Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      {accountInvoices && accountInvoices.length > 0 && accountInvoices.map((invoice) => (
                        <InvoiceRow invoice={invoice} contract={contract} account={account} key={invoice.invoiceID} page="manage" />
                      ))}
                      </tbody>
                  </table>
                </div>
              </div>
        </div>
    );
};

export default ManageInvoice;