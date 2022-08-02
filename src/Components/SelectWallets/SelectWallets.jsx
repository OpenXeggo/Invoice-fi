import Modal from "../Modal/modal";
import MetaMaskIcon from "../../assets/metamask.png";
import CoinbaseIcon from "../../assets/coinbase.svg";
import WalletConnectIcon from "../../assets/walletconnect.png";
import { useDispatch, useSelector } from "react-redux";
import "./selectwallets.css"
import WalletBox from "./WalletBox";
import { useEffect } from "react";
import { connectToMetaMask } from "../../utils/connectWallet";

const SelectWallets = ({closeModal}) => {
    const { address } = useSelector(state=>state.user);

    const handleConnectWallet = async (type) => {
        try{
            if(type === "metamask") {
                await connectToMetaMask();
                closeModal();
            }
        } catch(e){
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
                    <WalletBox connectWallet={()=>handleConnectWallet("metamask")} name={"MetaMask"} imgSrc={MetaMaskIcon}  />
                    <WalletBox connectWallet={()=>handleConnectWallet("metamask")} name={"Coinase Wallet"} imgSrc={CoinbaseIcon} />
                    <WalletBox connectWallet={()=>handleConnectWallet("metamask")} name={"Wallet Connect"} imgSrc={WalletConnectIcon} />
                </div>
            </div>
        </Modal>
    );
}
 
export default SelectWallets;