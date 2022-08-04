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
import "./selectwallets.css"
import WalletBox from "./WalletBox";
import { useEffect } from "react";
import { connectToMetaMask } from "../../utils/connectWallet";

const SelectWallets = ({closeModal }) => {
  const dispatch = useDispatch();
  const { chainId } = useSelector((state) => state.network);
  const { address } = useSelector(state=>state.user);

  const handleConnectWallet = async (type) => {
    try {
      if (address.length > 1) {
        closeModal();
        return;
      }
      await connectToMetaMask();
      const { ethereum } = window;
      const chain = await ethereum.request({ method: "eth_chainId" });
      const chainId = Number(chain).toString();
      dispatch(addChainIdAction(chainId));

      const isNetworkSupported = isChainSupported(chainId);
      dispatch(addIsNetworkSupported(isNetworkSupported));
      closeModal();
    } catch (e) {
      console.log(e);
    }
  }

    useEffect(()=>{
      if(address.length > 1) closeModal();
    },[address])
  
  return ( 
    <Modal>
        <div className="wallet-container">
            <div className="wallet-header text-center">
                <span className=" font-24 line-36 ">Select your wallet</span>
            </div>
            <div className="wallet-body">
                <WalletBox 
                  connectWallet={()=>handleConnectWallet("metamask")} 
                  name={"MetaMask"} 
                  imgSrc={MetaMaskIcon}  
                />
                <WalletBox 
                  connectWallet={()=>handleConnectWallet("metamask")} 
                  name={"Coinase Wallet"} 
                  imgSrc={CoinbaseIcon} 
                />
                <WalletBox 
                  connectWallet={()=>handleConnectWallet("metamask")} 
                  name={"Wallet Connect"} 
                  imgSrc={WalletConnectIcon} 
                />
            </div>
        </div>
    </Modal>
  );
};
 
export default SelectWallets;
