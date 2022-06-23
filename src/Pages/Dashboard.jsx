import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceButton from '../Components/InvoiceButton';
import Token from '../Token.json';
import { initWeb3 } from '../utils/init';


const Dashboard = ({ invoices, account }) => {
    const navigate = useNavigate();
    const web3 = initWeb3();
    const [accountInvoices, setAccountInvoices] = useState([]);

    const filterAccountInvoices = ()=>{
      return invoices.filter((invoice) => {
        return invoice.receiver === account || invoice.invoiceCreator === account;
      });
    }

    const getTokenSymbol = async (tokenAddress) => {
      const token = new web3.eth.Contract(Token, tokenAddress);
      const tokenSymbol = await token.methods.symbol().call();
      return {tokenSymbol};
    }

    const handleRedirect = (id) => {
        navigate(`/invoices/${id}`);
    }
  
    useEffect(()=>{
      if(invoices.length) {
        const filteredInvoices = filterAccountInvoices(invoices);

        const parseInvoices = async (invoiceList) => {
          if(invoiceList.length){
            for (let i = 0; i < invoiceList.length; i++){
              let { tokenSymbol } = await getTokenSymbol(invoiceList[i].tokenAddress);
              invoiceList[i] = {...invoiceList[i],tokenSymbol };
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
      <div className="body-container">
        <span className="page-title">Dashboard</span>
          <div className="page-content">
            <div className="table-container">
              <table className='table'>
                <tbody>
                  <tr className='table-head'>
                    <th>Invoice #</th>
                    <th>Invoice Creator / Recevier</th>
                    <th>Token Symbol</th>
                    <th>Token Amount</th>
                    <th>Pay / Cancel</th>
                  </tr>
                  {accountInvoices.length > 0 && accountInvoices.map((invoice) => {
                    return (
                      <tr className="table-data" key={invoice.invoiceID} onClick={()=>handleRedirect(invoice.invoiceID)}>
                        <td>{invoice.invoiceID}</td>
                        <td className="text-3xl">
                          {invoice.invoiceCreator === account
                            ? invoice.receiver
                            : invoice.invoiceCreator}
                        </td>
                        <td className='text-center'>{invoice.tokenSymbol}</td>
                        <td>{invoice.tokenAmountInWei}</td>
                        <td> <InvoiceButton invoice={invoice} account={account} /> </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    );
  };

export default Dashboard;
  