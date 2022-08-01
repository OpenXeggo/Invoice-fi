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
import { checkIfUserExists, checkUserFirstTime } from "./utils/checkUser.js";
import SelectWallets from "./Components/SelectWallets/SelectWallets.jsx";
import Invoice from "./Invoice.json";

function App() {
  const dispatch = useDispatch();
  const { chainId, isSupported } = useSelector((state) => state.network);
  console.log("CHAIN", chainId);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({});
  const web3 = initWeb3();
  const Client = new ApolloClient({
    uri: isSupported ? networks[chainId]?.graphAPI : "",
    cache: new InMemoryCache(),
  });
  const [invoices, setInvoices] = useState([]);

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

  const fetchQuery = async () => {
    if (chainId) {
      const { data } = await Client.query({ query: gql(getInvoices) });
      const { invoices } = data;
      console.log({ invoices }, "This is the result gotten from graphql");
      setInvoices(invoices);
    }
  };

  const [welcomeModal, setWelcomeModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [walletModal, setWalletModal] = useState(false);

  const checkUser = () => {
    if (!checkUserFirstTime()) {
      setWelcomeModal(true);
      return;
    }
    if (account.length < 1) {
      setWalletModal(true);
      return;
    }
    if (!checkIfUserExists()) {
      setProfileModal(true);
      return;
    }
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

  const closeWelcomeModal = () => setWelcomeModal(false);
  const closeProfileModal = () => setProfileModal(false);

  const closeWalletModal = () => {
    setWalletModal(false);
  };

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
              contract={contract}
              invoices={invoices}
              account={account}
              web3={web3}
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
        <ProfileDetails closeModal={closeProfileModal} account={account} />
      )}
    </div>
  );
}

export default App;
