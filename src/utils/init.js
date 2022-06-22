import Web3 from 'web3';
import Invoice from '../Invoice.json';

export const initWeb3 = () => {
  const { ethereum } = window;
  if (!ethereum) {
    return;
  }
  const web3 = new Web3(ethereum);
  return web3;
};

export const initContract = () => {
  const web3 = initWeb3();
  if (!web3) {
    return;
  }
  const contract = new web3.eth.Contract(
    Invoice,
    '0x38399AC5E7d8b75531AC676D649a6451C7a22599'
  );

  return contract;
};
