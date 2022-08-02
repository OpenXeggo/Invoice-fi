import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceButton from '../../Components/InvoiceButton';
import Token from '../../Token.json';
import { initWeb3 } from '../../utils/init';
import DashboardErr from '../../Components/DashboardErr/DashboardErr';
import WelcomeHello from '../../Components/welcomeHello/WelcomeHello';
import Overview from '../../Components/overview/Overview';
import Notifications from '../../Components/notifications/Notifications';
import './Dashboard.css'
import { useSelector } from 'react-redux';


const Dashboard = ({ invoices }) => {
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
      <div className="body-container">
        <WelcomeHello address={address}/>
        <div className='display-flex-row gap'>
          <div className='width'>
            <Overview address={address}/>
            <span className="block">Recent Transactions</span>
            {address ? (
              <div className="page-content content">
                <div className="table-container w-h">
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Invoice #</th>
                        <th>Invoice Creator / Recevier</th>
                        <th>Token Symbol</th>
                        <th>Token Amount</th>
                        <th>Pay / Cancel</th>
                      </tr>
                      </thead>
                      {accountInvoices && accountInvoices.length > 0 && accountInvoices.map((invoice) => {
                        return (
                          <tbody>
                            <tr key={invoice.invoiceID} onClick={()=>handleRedirect(invoice.invoiceID)}>
                              <td>{invoice.invoiceID}</td>
                              <td>
                                {invoice.invoiceCreator === address
                                  ? invoice.receiver
                                  : invoice.invoiceCreator}
                              </td>
                              <td>{invoice.tokenSymbol}</td>
                              <td>{invoice.tokenAmountInWei}</td>
                              <td> <InvoiceButton invoice={invoice} address={address} /> </td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </table>
                </div>
              </div>) : (
              <DashboardErr />
            )}
          </div>
          <Notifications address={address}/>
        </div>
      </div>
    );
  };

export default Dashboard;
  