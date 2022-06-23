import { useNavigate } from 'react-router-dom';
import InvoiceButton from '../Components/InvoiceButton';

const Dashboard = ({ invoices, account }) => {
    const navigate = useNavigate();
  
    const accountInvoices = invoices.filter((invoice) => {
      return invoice.receiver === account || invoice.invoiceCreator === account;
    });
  

    const handleRedirect = (id) => {
        navigate(`/invoices/${id}`);
    }
  
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
                    <th>Token Address</th>
                    <th>Token Amount</th>
                    <th>Pay / Cancel</th>
                  </tr>
                  {accountInvoices.map((invoice) => {
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
                        <td>{invoice.tokenAddress}</td>
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
  