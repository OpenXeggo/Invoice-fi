import React from 'react';
import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import CreateInvoice from './Pages/CreateInvoice/CreateInvoice.jsx';
import { initContract, initWeb3 } from './utils/init';
import { getInvoices } from './utils/queries';
import Dashboard from './Pages/Dashboard/Dashboard';
import ManageInvoice from './Pages/ManageInvoice/ManageInvoice.jsx';
import { Routes, Route } from 'react-router-dom';
import InvoicePage from './Pages/InvoicePage';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import ProfileDetails from './Components/ProfileDetails/ProfileDetails.jsx';
import { useSelector } from 'react-redux';

import "./App.css";
import Navbar from './Components/Navbar/Navbar.jsx';
import WelcomeCard from './Components/WelcomeCard/WelcomeCard.jsx';
import { checkIfUserExists, checkUserFirstTime } from './utils/checkUser.js';
import SelectWallets from './Components/SelectWallets/SelectWallets.jsx';
import { connectToMetaMask } from './utils/connectWallet.js';



function App() {
  const {address} = useSelector(state=>state.user);
  const [contract, setContract] = useState({});
  const web3 = initWeb3();
  const Client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/aman-webdev/invoicetestn',
    cache: new InMemoryCache(),
  });
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      setContract(initContract());
      fetchQuery();
    }
  }, [address]);

  const connectUser = async () => {
    try{
      let type = localStorage.getItem("wallet_type");
      if (type === "metamask") await connectToMetaMask();
    } catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    connectUser();
  },[])

  const fetchQuery = async () => {
    const { data } = await Client.query({ query: gql(getInvoices) });
    const { invoices } = data;
    console.log({invoices}, "This is the result gotten from graphql");
    setInvoices(invoices);
  };


  const [welcomeModal, setWelcomeModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [walletModal, setWalletModal] = useState(false)

  const checkUser = () => {
    if (!checkUserFirstTime()) {
      setWelcomeModal(true);
      return;
    }
    if (address.length < 1) {
      setWalletModal(true);
      return;
    }
    if (!checkIfUserExists()) {
      setProfileModal(true);
      return;
    }
  }

  useEffect(()=>{
    checkUser();
  },[address]);

  const closeWelcomeModal  = () => setWelcomeModal(false);
  const closeProfileModal  = () => setProfileModal(false);
  
  const closeWalletModal = () => {
    setWalletModal(false);
  }

  return (
    <div className='App'>
      <Navbar account={address} />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard invoices={invoices} web3={web3} contract={contract} /> } />
        <Route path='/create' element={<CreateInvoice contract={contract} />} />
        <Route path='/invoices' element={<ManageInvoice invoices={invoices}/>}/>
        <Route path='/invoices/:id' element={<InvoicePage invoices={invoices} web3={web3} />} />
      </Routes>
      {welcomeModal && <WelcomeCard closeModal={closeWelcomeModal} />}
      {walletModal && <SelectWallets closeModal={closeWalletModal} />}
      {profileModal && <ProfileDetails closeModal={closeProfileModal} /> }
    </div>
  );
}

export default App;
