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

    const parseInvoices = (invoiceList) => {
      if(invoiceList.length){
        invoiceList = invoiceList.map(async invoice => {
          const {tokenSymbol} = await getTokenSymbol(invoice.tokenAddress);
          invoice = {...invoice, tokenSymbol}
          setAccountInvoices(invoices=>[...invoices, invoice])
        })
      }
    }

    const handleRedirect = (id) => {
        navigate(`/invoices/${id}`);
    }
  
    useEffect(()=>{
      if(invoices.length) {
        const filteredInvoices = filterAccountInvoices(invoices);
        parseInvoices(filteredInvoices);
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
                    console.log(
                      invoice.invoiceCreator === account
                        ? invoice.receiver
                        : invoice.invoiceCreator,
                      invoice.invoiceID
                    );
                    return (
                      <tr className="table-data" key={invoice.invoiceID} onClick={()=>handleRedirect(invoice.invoiceID)}>
                        <td>{invoice.invoiceID}</td>
                        <td className="text-3xl">
                          {invoice.invoiceCreator === account
                            ? invoice.receiver
                            : invoice.invoiceCreator}
                        </td>
                        <td>{invoice.tokenSymbol}</td>
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
  