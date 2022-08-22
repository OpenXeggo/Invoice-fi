import Modal from "../Modal/modal";
import "./addcustomtoken.css";
import { useState } from "react";
import ErrorIcon from "../../assets/error.svg";
import { initWeb3 } from "../../utils/init";
import ERC20Mock from "../../utils/ERC20Mock.json";
import { useEffect } from "react";

const AddTokenModal = ({setCustomToken, setAssets, assets, setToken, setSelectedToken}) => {

    const [error, setError] = useState(false);
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const web3 = initWeb3();

    const getTokenDetails = (address) => {
        return new Promise(async (resolve, reject)=>{
            try{
                const tokenContract = new web3.eth.Contract(ERC20Mock.abi, address);
                console.log({tokenContract});
                const [name, symbol] = await Promise.all([
                    tokenContract.methods.symbol().call(),
                    tokenContract.methods.decimals().call(),
                    tokenContract.methods.name().call(),
                ]);
                resolve({symbol, name})
            }
            catch(e){
                reject({message: "Error getting Token Details"});
            }
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError(false);
            for (let item of assets) {
                if (item.tokenName === tokenName) {
                    throw new Error("Token Name Already Used");
                }
            }

            if (!web3.utils.isAddress(tokenAddress)) {
                throw new Error("Invalid Address");
            }

            if (tokenName.length === 0) {
                const {name} = await getTokenDetails(tokenAddress);
                setTokenName(name);
            }

            let tokenObj = {
                name: tokenName.trim(),
                address: tokenAddress.trim()
            }
            let assetObj = {
                tokenName: tokenName.trim(),
                currencies: [{...tokenObj}]
            }
            setAssets(assets => [...assets,{...assetObj} ]);
            setToken({...tokenObj});
            setSelectedToken({...assetObj});
            closeTokenModal();
            
        } catch (e) {
            setError(e.message);
        }
    }

    const closeTokenModal = () => {
        setTokenName("")
        setTokenAddress("")
        setCustomToken(false);
    }


    const setTokenSymbol = async () => {
        try {
            setIsLoading(true);
            const { name } = await getTokenDetails(tokenAddress);
            setTokenName(name);
            setIsLoading(false)
        } catch(e){
            console.log(e.message);
        }
    }

    useEffect(()=>{
        if (tokenAddress.length === 42) {
            setTokenSymbol();
        }
    },[tokenAddress])

    return ( 
        <Modal closeFunction={closeTokenModal}>
            <div className="custom-token-container">
                <h2 className=" font-16 line-24 weight-600 mb-40">Add Custom Tokens</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <input type="text" className="mb-20" placeholder="Token Address" value={tokenAddress} onChange={(e)=>setTokenAddress(e.target.value)} />
                        <input type="text" placeholder="Token Name" value={tokenName} disabled={tokenName.length === 0 ? true : false} onChange={(e)=>setTokenName(e.target.value)} />
                        {error.length > 0 ? (
                            <div className="error-container visible">
                                <img src={ErrorIcon} />
                                <span className="error-message">{error}</span>
                            </div>
                        ) : (
                            <div className="error-container">

                            </div>
                        )}
                        <button className="xeggo-button">Add Token</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
 
export default AddTokenModal;