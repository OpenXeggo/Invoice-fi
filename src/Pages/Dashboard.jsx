import { useNavigate } from 'react-router-dom';
import InvoiceButton from '../Components/InvoiceButton';

const Dashboard = ({ invoices, account }) => {
    const navigate = useNavigate();
  
    const accountInvoices = invoices.filter((invoice) => {
      return invoice.receiver === account || invoice.invoiceCreator === account;
    });
  
    console.log(accountInvoices);

    const handleRedirect = (id) => {
        navigate(`/invoices/${id}`);
    }
  
    return (
      <table>
        <tbody>
          <tr>
            <th>Invoice Id</th>
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
              <tr className="p-2" key={invoice.invoiceID} onClick={()=>handleRedirect(invoice.invoiceID)}>
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
    );
  };

export default Dashboard;
  