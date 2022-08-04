import { store } from "../store";


export const connectToMetaMask = async () => {
    return new Promise(async (resolve, reject)=>{
        try{
            const { ethereum } = window;
            if (!ethereum) {
            return alert('Please install metamask');
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            store.dispatch({type:"ADD_USER_ADDRESS", payload: accounts[0]});
            addToStorage("metamask");
            resolve(true);
        } catch(e){
            reject(e);
        }
    })
}

const addToStorage = (type) => {
    localStorage.setItem("wallet_type", type);
}

