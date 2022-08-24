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
import InvoiceRow from '../../Components/InvoiceRow/InvoiceRow';


const Dashboard = ({ invoices, account, contract }) => {
  const navigate = useNavigate();
  const web3 = initWeb3();
  const [accountInvoices, setAccountInvoices] = useState([]);
  const [invoiceStats,setInvoiceStats] = useState({clients:0,invoices:0,paid:0,pending:0});

  const filterAccountInvoices = () => {
    return invoices.filter((invoice) => {
      return invoice.receiver === account || invoice.invoiceCreator === account;
    });
  };

  const getTokenSymbol = async (tokenAddress) => {
    try {
      const token = new web3.eth.Contract(Token, tokenAddress);
      const tokenSymbol = await token.methods.symbol().call();
      return { tokenSymbol };
    } catch (err) {
      return { tokenSymbol: "invalid" };
    }
  };



  const checkAddress = (address) => {
    const isAddress = web3.utils.isAddress(address);
    return isAddress;
  };

  useEffect(() => {
    if (invoices.length) {
      const filteredInvoices = filterAccountInvoices(invoices);

      const parseInvoices = async (invoiceList) => {
        if (invoiceList.length) {
          for (let i = 0; i < invoiceList.length; i++) {
            if (checkAddress(invoiceList[i].tokenAddress)) {
              let { tokenSymbol } = await getTokenSymbol(
                invoiceList[i].tokenAddress
              );
              invoiceList[i] = { ...invoiceList[i], tokenSymbol };
            } else {
              let tokenSymbol = "invalid";
              invoiceList[i] = { ...invoiceList[i], tokenSymbol };
            }
          }
          return invoiceList;
        }
      };

      const getClients=(invoices)=>{
        const res=[]
        invoices.map(invoice=>{
          res.push(invoice.receiver)
        })

        return [...new Set(res)]
        
      }

      const getPaidInvoices=(invoices)=>{
        return invoices.filter(invoice=>invoice.isPaid===true)
      }
      const getPendingInvoices=(invoices)=>{
        return invoices.filter(invoice=>invoice.isPaid===false && invoice.isCancelled===false)
      }

      const setInvoices = async () => {
        const parsedInvoice = await parseInvoices(filteredInvoices);
        console.log(parsedInvoice,"parsed")
        const clients = getClients(parsedInvoice).length
        const invoices = parsedInvoice.length
        const paid = getPaidInvoices(parsedInvoice).length;
        const pending = getPendingInvoices(parsedInvoice).length;
        setInvoiceStats({clients,invoices,paid,pending});
        setAccountInvoices(parsedInvoice);
      };

      setInvoices();
    }
  }, [invoices]);

  return (
    <div className="body-container">
      <WelcomeHello account={account} />
      <div className="display-flex-row gap">
        <div className="width">
          <Overview account={account} invoiceStats={invoiceStats} />
          <span className="block">Recent Transactions</span>
          {account ? (
            <div className="page-content content">
              <div className="table-container w-h">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Invoice No.</th>
                      <th>Issue Date</th>
                      <th>Token Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {accountInvoices &&
                    accountInvoices.length > 0 &&
                    accountInvoices.map((invoice) => {
                      return (
                        <InvoiceRow invoice={invoice} account={account} contract={contract} page="dashboard" />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <DashboardErr />
          )}
        </div>
        <Notifications account={account} />
      </div>
    </div>
  );
};

export default Dashboard;
  