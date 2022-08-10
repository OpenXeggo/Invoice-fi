import React from 'react';
import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import CreateInvoice from './Pages/CreateInvoice/CreateInvoice.jsx';
import { initContract, initWeb3 } from './utils/init';
import { getInvoices } from './utils/queries';
import Dashboard from './Pages/Dashboard/Dashboard';
import ManageInvoice from './Pages/ManageInvoice/ManageInvoice.jsx';
import { Routes, Route } from 'react-router-dom';
import { ethers } from "ethers";
import InvoicePage from "./Pages/InvoicePage";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import ProfileDetails from "./Components/ProfileDetails/ProfileDetails.jsx";
import { useSelector, useDispatch } from "react-redux";
import convertChainInHexToString from "./utils/convertHexChainToString.js";
import { networks } from "./network.config.json";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar.jsx";
import WelcomeCard from "./Components/WelcomeCard/WelcomeCard.jsx";
import { checkUserFirstTime } from "./utils/checkUser.js";
import SelectWallets from "./Components/SelectWallets/SelectWallets.jsx";
import Invoice from "./Invoice.json";
import { useMoralis } from 'react-moralis';
import { addChainIdAction, addIsNetworkSupported,  } from './store/actions/networkActions';
import isChainSupported from './utils/isChainSupported.js';
import { addUserAddressAction } from './store/actions/userActions.js';


function App() {
  const dispatch = useDispatch();
  const { chainId, isSupported } = useSelector((state) => state.network);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({});
  const web3 = initWeb3();

  const Client = new ApolloClient({
    uri: isSupported ? networks[chainId]?.graphAPI : "",
    cache: new InMemoryCache(),
  });
  const [invoices, setInvoices] = useState([]);
  const { Moralis, isAuthenticated, user } = useMoralis();

  useEffect(()=>{
    if(isAuthenticated){
      Moralis.onAccountChanged( async (account) => {
        try{
          console.log("account changed");
          const confirmed = window.confirm("Link this address to your account?");
          if (confirmed) {
            await Moralis.link(account);
          }
        } catch(e){
          console.log(e);
        }
      })
    }
  },[isAuthenticated, user])

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum) {
      const web3 = initWeb3();
      if (!web3) {
        return;
      }
      const contract = new web3.eth.Contract(
        Invoice,
        isSupported
          ? networks[chainId]?.contractAddress
          : ethers.constants.AddressZero
      );
      setContract(contract);
      fetchQuery();
    }
  }, [account]);

  const connectToMetaMask = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        return alert("Please install metamask");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const chain = await ethereum.request({ method: "eth_chainId" });
      const chainId = Number(chain).toString();
      dispatch(addChainIdAction(chainId));
      dispatch(addUserAddressAction(accounts[0]));

      const isNetworkSupported = isChainSupported(chainId);
      dispatch(addIsNetworkSupported(isNetworkSupported));
      setAccount(accounts[0]);
    } catch (e) {
      console.log(e);
    }
  }

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
    if (chainId && isSupported) {
      const { data } = await Client.query({ query: gql(getInvoices) });
      const { invoices } = data;
      console.log ({ invoices }, "This is the result gotten from graphql");
      setInvoices(invoices);
    }
  };

  const [welcomeModal, setWelcomeModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [walletModal, setWalletModal] = useState(false);

  const checkUser = () => {
    // if user has not visited site before start welcome cards
    if (!checkUserFirstTime()) {
      setWelcomeModal(true);
      return;
    }
    // if there is no account add open wallet modal
    if (account.length < 1) {
      // if there is a method to connect to wallet already skip wallet page
      if( localStorage.getItem("wallet_type").length > 0 ) return;
      setWalletModal(true);
      return;
    }
    setProfileModal(true);
  };

  useEffect(() => {
    checkUser();
  }, [account]);


  useEffect(() => {
    console.log(chainId, "CHAIN ID");
    const { ethereum } = window;

    if (ethereum && !chainId) {
      ethereum.on("chainChanged", (chain) => {
        window.location.reload();
      });
    }
  }, [chainId, dispatch]);

  // functions to close Modals
  const closeWelcomeModal = () => setWelcomeModal(false);
  const closeProfileModal = () => setProfileModal(false);
  const closeWalletModal = () => setWalletModal(false);

  return (
    <div className="App">
      <Navbar account={account} />
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              invoices={invoices}
              account={account}
              web3={web3}
              contract={contract}
            />
          }
        />
        <Route
          path="/create"
          element={<CreateInvoice contract={contract} account={account} />}
        />
        <Route
          path="/invoices"
          element={
            <ManageInvoice
              invoices={invoices}
              account={account}
              contract={contract}
            />
          }
        />
        <Route
          path="/invoices/:id"
          element={
            <InvoicePage
              invoices={invoices}
              account={account}
              web3={web3}
              contract={contract}
            />
          }
        />
      </Routes>
      {welcomeModal && (
        <WelcomeCard
          closeModal={closeWelcomeModal}
          setAccount={setAccount}
          account={account}
        />
      )}
      {walletModal && (
        <SelectWallets
          account={account}
          setAccount={setAccount}
          closeModal={closeWalletModal}
        />
      )}
      {profileModal && (
        <ProfileDetails 
          closeModal={closeProfileModal} 
          account={account} />
      )}
    </div>
  );
}

export default App;
