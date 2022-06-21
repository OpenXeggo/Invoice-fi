import React from 'react';
import { useState, useEffect } from 'react';
import CreateInvoice from './Pages/CreateInvoice';
import CancelInvoice from './Pages/CancelInvoice';

import { initContract, initWeb3 } from './utils/init';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setcontract] = useState({});

  useEffect(() => {
    connectWallet();
    setcontract(initContract());
  }, []);

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
    <div className="App text-3xl">
      <CreateInvoice contract={contract} account={account} />
      <CancelInvoice contract={contract} account={account} />
    </div>
  );
}

export default App;
