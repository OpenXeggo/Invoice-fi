import Modal from "../Modal/modal";
import MetaMaskIcon from "../../assets/metamask.png";
import CoinbaseIcon from "../../assets/coinbase.svg";
import WalletConnectIcon from "../../assets/walletconnect.png";

import "./selectwallets.css"
import WalletBox from "./WalletBox";

const SelectWallets = ({account, setAccount,  closeModal}) => {

    const handleConnectWallet = async () => {
        try{
            if(account.length > 1) {
                closeModal();
                return;
            }
            const { ethereum } = window;
            if (!ethereum) {
            return alert('Please install metamask');
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            closeModal();
        } catch(e){
            console.log(e);
        }
    }

    return ( 
        <Modal>
            <div className="wallet-container">
                <div className="wallet-header text-center">
                    <span className=" font-24 line-36 ">Select your wallet</span>
                </div>
                <div className="wallet-body">
                    <WalletBox connectWallet={handleConnectWallet} name={"MetaMask"} imgSrc={MetaMaskIcon}  />
                    <WalletBox connectWallet={handleConnectWallet} name={"Coinase Wallet"} imgSrc={CoinbaseIcon} />
                    <WalletBox connectWallet={handleConnectWallet} name={"Wallet Connect"} imgSrc={WalletConnectIcon} />
                </div>
            </div>
        </Modal>
    );
}
 
export default SelectWallets;