import { useDispatch, useSelector } from "react-redux";
import {
  addChainIdAction,
  addIsNetworkSupported,
} from "../../store/actions/networkActions";
import isChainSupported from "../../utils/isChainSupported";
import { addUserAddressAction } from "../../store/actions/userActions";
import { networks } from "../../network.config.json";
import Modal from "../Modal/modal";
import MetaMaskIcon from "../../assets/metamask.png";
import CoinbaseIcon from "../../assets/coinbase.svg";
import WalletConnectIcon from "../../assets/walletconnect.png";
import "./selectwallets.css";

const SelectWallets = ({ account, setAccount, closeModal }) => {
  const dispatch = useDispatch();
  const { chainId } = useSelector((state) => state.network);
  console.log("CHAIN", chainId);

  const handleConnectWallet = async () => {
    if (account.length > 1) {
      closeModal();
      return;
    }

    const { ethereum } = window;
    if (!ethereum) {
      return alert("Please install metamask");
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const chain = await ethereum.request({ method: "eth_chainId" });
    const chainId = Number(chain).toString();
    dispatch(addChainIdAction(chainId));
    dispatch(addUserAddressAction(accounts[0]));

    const isNetworkSupported = isChainSupported(chainId);
    dispatch(addIsNetworkSupported(isNetworkSupported));

    setAccount(accounts[0]);
    closeModal();
  };

  return (
    <Modal>
      <div className="wallet-container">
        <div className="wallet-header text-center">
          <span className=" font-24 line-36 ">Select your wallet</span>
        </div>
        <div className="wallet-body">
          <div className="wallet-box" onClick={handleConnectWallet}>
            <span>
              <img src={MetaMaskIcon} />
            </span>
            <span>Metamask</span>
          </div>
          <div className="wallet-box">
            <span>
              <img src={CoinbaseIcon} />
            </span>
            <span>Coinbase Wallet</span>
          </div>
          <div className="wallet-box">
            <span>
              <img src={WalletConnectIcon} />
            </span>
            <span>WalletConnect</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectWallets;
