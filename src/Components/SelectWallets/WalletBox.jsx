import { useState } from "react";

const WalletBox = ({name, connectWallet, imgSrc}) => {
    const [isloading, setIsLoading] = useState(false);

    const handleConnectWallet = async () => {
        setIsLoading(true)
        await connectWallet();
        setIsLoading(false)
    }
    return ( 
        <div className="wallet-box" onClick={handleConnectWallet}>
            <span><img src={imgSrc} /></span>
            <span>{name}</span>
            {isloading  && <div className="spinner"></div>}
        </div>
    );
}
 
export default WalletBox;