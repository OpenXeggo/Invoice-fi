import { useEffect, useState } from 'react';
import Token from '../../Token.json';
import { initWeb3 } from '../../utils/init';
import DashboardErr from '../../Components/DashboardErr/DashboardErr';
import WelcomeHello from '../../Components/welcomeHello/WelcomeHello';
import Overview from '../../Components/overview/Overview';
import Notifications from '../../Components/notifications/Notifications';
import './Dashboard.css'
import InvoiceRow from '../../Components/InvoiceRow/InvoiceRow';


const Dashboard = ({ invoices, account, contract }) => {
  const web3 = initWeb3();
  const [accountInvoices, setAccountInvoices] = useState([]);

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

      const setInvoices = async () => {
        const parsedInvoice = await parseInvoices(filteredInvoices);
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
          <Overview account={account} />
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
        <Notifications account={account} invoices={accountInvoices} />
      </div>
    </div>
  );
};

export default Dashboard;
  