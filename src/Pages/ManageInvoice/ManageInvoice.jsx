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
import { useSelector } from 'react-redux';


const ManageInvoice = ({invoices,contract}) => {
    const {address} = useSelector(state=>state.user);
    const navigate = useNavigate();
    const web3 = initWeb3();
    const [accountInvoices, setAccountInvoices] = useState([]);

    const filterAccountInvoices = ()=>{
      return invoices.filter((invoice) => {
        return invoice.receiver === address || invoice.invoiceCreator === address;
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

    const deleteInvoice = () => {
        
    }

    const copyInvoice = () => {
      
    }

    const downloadInvoice = () => {
      
    }

    const handleRedirect = (id) => {
        navigate(`/invoices/${id}`);
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
            <div className='display-flex-row pt'>
                <div className=''>
                    <h2>Manage Invoices</h2>
                    <p>Invoices/Manage-Invoices</p>
                </div>
                <Button 
                    Icon={PlusIcon} 
                    text={"Create Invoice"} 
                />
            </div>
            <div className="page-content content m-t-b">
                <div className="table-container w-h">
                  <table className='table '>
                    <thead>
                      <tr>
                        <th>Invoice #</th>
                        <th>Invoice Creator / Recevier</th>
                        <th>Token Symbol</th>
                        <th>Token Amount</th>
                        <th>Pay / Cancel</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      {accountInvoices && accountInvoices.length > 0 && accountInvoices.map((invoice) => {
                        return (
                          <tbody>
                            <tr key={invoice.invoiceID}>
                              <td>{invoice.invoiceID}</td>
                              <td>
                                {invoice.invoiceCreator === address
                                  ? invoice.receiver
                                  : invoice.invoiceCreator}
                              </td>
                              <td>{invoice.tokenSymbol}</td>
                              <td>{invoice.tokenAmountInWei}</td>
                              <td> <InvoiceButton invoice={invoice} account={address} contract={contract} /> </td>
                              <td>
                                <CopyIcon className='action-icon' />
                                <PreviewIcon className='action-icon' onClick={()=>handleRedirect(invoice.invoiceID)}/>
                                <DownloadIcon className='action-icon' />
                                <DelIcon className='action-icon' />
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </table>
                </div>
              </div>
        </div>
    );
};

export default ManageInvoice;