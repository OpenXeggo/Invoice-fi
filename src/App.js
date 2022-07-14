import React from 'react';
import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import CreateInvoice from './Pages/CreateInvoice/CreateInvoice.jsx';
import { initContract, initWeb3 } from './utils/init';
import { getInvoices } from './utils/queries';
import Dashboard from './Pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import InvoicePage from './Pages/InvoicePage';
import Sidebar from './Components/Sidebar/Sidebar.jsx';


import "./App.css";
import Navbar from './Components/Navbar/Navbar.jsx';



function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState({});
  const web3 = initWeb3();
  const Client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/aman-webdev/invoicetestn',
    cache: new InMemoryCache(),
  });
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    connectWallet();
    if (window.ethereum) {
      setContract(initContract());
      fetchQuery();
    }
  }, []);

  const fetchQuery = async () => {
    const { data } = await Client.query({ query: gql(getInvoices) });
    const { invoices } = data;
    console.log({invoices}, "This is the result gotten from graphql");
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
      <Navbar account={account} />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard invoices={invoices} account={account} web3={web3} contract={contract} /> } />
        <Route path='/create' element={<CreateInvoice contract={contract} account={account} />} />
        <Route path='/invoices/:id' element={<InvoicePage invoices={invoices} account={account} web3={web3} />} />
      </Routes>
    </div>
  );
}

export default App;
