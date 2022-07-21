import React from "react";
import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import CreateInvoice from "./Pages/CreateInvoice/CreateInvoice.jsx";
import { initContract, initWeb3 } from "./utils/init";
import { getInvoices } from "./utils/queries";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ManageInvoice from "./Pages/ManageInvoice/ManageInvoice.jsx";
import InvoicePage from "./Pages/InvoicePage";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import ProfileDetails from "./Components/ProfileDetails/ProfileDetails.jsx";

import "./App.css";
import Navbar from "./Components/Navbar/Navbar.jsx";
import WelcomeCard from "./Components/WelcomeCard/WelcomeCard.jsx";
import { checkIfUserExists } from "./utils/dbQueries.js";

function App() {
  const [contract, setContract] = useState({});
  const [invoices, setInvoices] = useState([]);

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("invoiceUser"))
  );
  const [welcomeModal, setWelcomeModal] = useState(!user);
  const [welcomePage, setWelcomePage] = useState(1);
  const [profileModal, setProfileModal] = useState(!user);
  const [account, setAccount] = useState(user ? user.walletAddress : "");

  const closeWelcomeModal = () => setWelcomeModal(false);
  const closeProfileModal = () => setProfileModal(false);

  const web3 = initWeb3();

  const Client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/aman-webdev/invoicetestn",
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    if (window.ethereum) {
      setContract(initContract());
      fetchQuery();
    }
  }, [account]);

  useEffect(() => {
    if (window.ethereum)
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (!accounts.length) {
          setUser(null);
          setAccount("");
          localStorage.clear();
          setWelcomeModal(true);
        } else {
          setAccount(accounts[0]);
          const result = await checkIfUserExists(accounts[0]);
          if (result.length) {
            localStorage.setItem("invoiceUser", JSON.stringify(result[0]));
            const jsonResult = result[0].toJSON();
            console.log(jsonResult);
            setUser(jsonResult);
            setAccount(jsonResult.walletAddress);
          } else {
            setWelcomeModal(true);
            setWelcomePage(2);
          }
        }
      });
  }, []);

  const fetchQuery = async () => {
    const { data } = await Client.query({ query: gql(getInvoices) });
    const { invoices } = data;
    console.log({ invoices }, "This is the result gotten from graphql");
    setInvoices(invoices);
  };

  return (
    <div className="App">
      <Navbar account={account} user={user} />
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              user={user}
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
          element={<ManageInvoice invoices={invoices} account={account} />}
        />
        <Route
          path="/invoices/:id"
          element={
            <InvoicePage invoices={invoices} account={account} web3={web3} />
          }
        />
      </Routes>
      {welcomeModal && (
        <WelcomeCard
          welcomePage={welcomePage}
          setUser={setUser}
          closeModal={closeWelcomeModal}
          setAccount={setAccount}
          account={account}
        />
      )}
    </div>
  );
}

export default App;
