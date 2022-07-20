import { useState } from "react";
import Modal from "../Modal/modal";
import ProfileIcon from "../../assets/profile.svg";

import BackButton from "../../assets/back.svg"

import "./welcomecard.css";

const WelcomeCard = ({closeModal, setAccount, account}) => {

    const [card, setCard] = useState(1);

    const connectWallet = async () => {
        const { ethereum } = window;
        if (!ethereum) {
          return alert('Please install metamask');
        }
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);
    };

    const changeCard = (direction) => {
        if (direction === "prev") {
            if (card === 1) return;
            setCard(card => card - 1);
        }
        if (direction === "next") {
            if (card === 3) return;
            setCard (card => card + 1);
        }
    }

    const handleConnectWallet = async () => {
        if (account.length > 0) {
            changeCard("next");
            return;
        }
        await connectWallet();
        changeCard("next");     
    } 

    const returnCard = (num) => {
        if (num === 1) {
            return (
                <>
                    <div className="mb-15">
                        <span className="font-20 line-30 weight-600">Welcome to Xeggo Invoice</span>
                    </div>
                    <div className="text-center mb-20">
                        <span className="font-14 line-21 weigth-500"> To be able to issue invoices to clients and receive payements, you need to complete the following onboarding steps.</span>
                    </div>
                    <div>
                        <button className="xeggo-button start-button" onClick={()=>changeCard("next")}>Let's start</button>
                    </div>
                </>
            )
        }
        if (num === 2) {
            return (
                <>
                    <div className="mb-15">
                        <span className="font-20 line-30 weight-600">Connect Wallet</span>
                    </div>
                    <div className="text-center mb-20">
                        <span className="font-14 line-21 weigth-500"> Connect your wallet and input your details to continue</span>
                    </div>
                    <div className="flex space-around items-center w-full">
                        <div className="flex items-center gap-15 back-btn" onClick={()=>changeCard("prev")} > <img src={BackButton}/> <span>Back</span></div>
                        <button className="xeggo-button" onClick={()=>handleConnectWallet()}>Connect Wallet</button>
                    </div>
                </>
                )
        }
        if (num === 3) {
            return (
                <>
                    <div className="mb-15">
                        <span className="font-20 line-30 weight-600">That's all</span>
                    </div>
                    <div className="text-center mb-20">
                        <span className="font-14 line-21 weigth-500"> Welldone, you have successfully connected your wallet, you can now create invoices.</span>
                    </div>
                    <div className="flex space-around items-center w-full">
                        <div className="flex items-center gap-15 back-btn" onClick={()=>changeCard("prev")}> <img src={BackButton}/> <span>Back</span></div>
                        <button className="xeggo-button done-btn" onClick={closeModal}>Done</button>
                    </div>
                </>
                )
        }
    }


    return ( 
        <Modal closeFunction={closeModal}>
            <div className="welcome-card-container flex flex-col items-center">
                <div className="mb-20">
                    <img src={ProfileIcon} alt="" width={"70px"} height="70px" />
                </div>
                <span className="font-14 line-21 weight-600 faint-color mb-10" >{card} of 3</span> 
                {returnCard(card)}
            </div>
        </Modal>
    );
}
 
export default WelcomeCard;