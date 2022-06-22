import React from 'react';
import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import CreateInvoice from './Pages/CreateInvoice';
import { initContract, initWeb3 } from './utils/init';
import bigNumber from 'big-number';
import { getInvoices } from './utils/queries';

import Token from './Token.json';

const Dashboard = ({ invoices, account }) => {
  const payHandler = async ({ tokenAddress, tokenAmountInWei, invoiceID }) => {
    const web3 = initWeb3();
    const contract = initContract();
    const token = new web3.eth.Contract(Token, tokenAddress);

    const allowanceAmount = await token.methods
      .allowance(account, '0x38399AC5E7d8b75531AC676D649a6451C7a22599')
      .call();

    if (bigNumber(allowanceAmount).lt(tokenAmountInWei)) {
      let tx = await token.methods
        .approve(
          '0x38399AC5E7d8b75531AC676D649a6451C7a22599',
          bigNumber(tokenAmountInWei)
        )
        .send({ from: account, gasLimit: 280000 });

      // Approve tx receipt
      console.log('tx', tx);
    }

    const allowanceAmount1 = await token.methods
      .allowance(account, '0x38399AC5E7d8b75531AC676D649a6451C7a22599')
      .call();
    console.log(allowanceAmount1);

    const pay = await contract.methods
      .payInvoice(invoiceID)
      .send({ from: account, gasLimit: 280000 });
    console.log(pay);
  };

  const accountInvoices = invoices.filter((invoice) => {
    return invoice.receiver === account || invoice.invoiceCreator === account;
  });

  console.log(accountInvoices);

  const cancelHandler = async ({ invoiceID }) => {
    const contract = initContract();
    try {
      await contract.methods
        .cancelInvoice(invoiceID)
        .send({ from: account, gasLimit: 210000 });
      alert('Invoice cancelled successfully');
    } catch (e) {
      alert(e.message);
    }
  };

  const renderInvoiceSection = (invoice) => {
    return (
      <div>
        {invoice.invoiceCreator === account ? (
          <div>
            {invoice.isCancelled ? (
              'Cancelled'
            ) : invoice.isPaid ? (
              'Paid'
            ) : (
              <button onClick={() => cancelHandler(invoice)}>Cancel</button>
            )}
          </div>
        ) : (
          <div>
            {invoice.isPaid ? (
              'Paid'
            ) : invoice.isCancelled ? (
              'Cancelled'
            ) : (
              <button onClick={() => payHandler(invoice)}>Pay</button>
            )}
          </div>
        )}
      </div>
    );
  };

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
            <tr className="p-2" key={invoice.invoiceID}>
              <td>{invoice.invoiceID}</td>
              <td className="text-3xl">
                {invoice.invoiceCreator === account
                  ? invoice.receiver
                  : invoice.invoiceCreator}
              </td>
              <td>{invoice.tokenAddress}</td>
              <td>{invoice.tokenAmountInWei}</td>
              <td>{renderInvoiceSection(invoice)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

function App() {
  const [account, setAccount] = useState('');
  const [contract, setcontract] = useState({});
  const Client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/aman-webdev/invoicetestn',
    cache: new InMemoryCache(),
  });
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    connectWallet();
    if (window.ethereum) {
      setcontract(initContract());
      fetchQuery();
    }
  }, []);

  const fetchQuery = async () => {
    const { data } = await Client.query({ query: gql(getInvoices) });
    const { invoices } = data;
    console.log(invoices);
    setInvoices(invoices);
  };

  const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      return alert('Please install metamask');
    }
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    setAccount(account);
  };

  return (
    <div>
      <h1 className="text-red-700">Xeggo Invoice</h1>
      <div className="text-3xl">
        <CreateInvoice contract={contract} account={account} />
      </div>

      <div className="border-4 border-solid bg-slate-500 border-blue-400 ">
        <Dashboard invoices={invoices} account={account} />
      </div>
    </div>
  );
}

export default App;
