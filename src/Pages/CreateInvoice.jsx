import React,{useState} from 'react'
import { initWeb3 } from '../utils/init'

const CreateInvoice = ({contract,account}) => {
    const [getInvoiceId, setGetInvoiceId] = useState()
    const [isSuccess, setIsSuccsee] = useState(false)
    const [isValidAccAddress, setIsValidAccAddree] = useState(false)
    const [invoiceData, setinvoiceData] = useState({
        tokenAddress:"",
        tokenAmount:0,
        receiverAddress:"",
    })
    
    const onChangeHandler=(e)=>{
        const {id,value} = e.target
        setinvoiceData({...invoiceData,[id]:value})
    }

    const onSubmitHandler=async(e)=>{
            e.preventDefault();
    
            let tokAddress = initWeb3().utils.isAddress(invoiceData.tokenAddress)

            if(!tokAddress){
                alert('Please enter valid token Address!')
                return
            }

            if(invoiceData.tokenAmount === 0){
                alert('Please enter a valid token amount!')
                return
            }

            try{
                let recAddress = await initWeb3().eth.getCode(invoiceData.receiverAddress)
                if(recAddress !== '0x'){
                    alert('Please enter valid receiver Address!')
                    return
                }
            }catch(err){
                if(err){
                    alert('Please enter valid receiver Address!')
                    return
                }
            }

            let str = invoiceData.tokenAmount.toString()

            let convertToWei = initWeb3().utils.toWei(str, "ether");
            let currentInvoiceId = await contract.methods.getNextInvoiceID().call()
            setGetInvoiceId(currentInvoiceId)
            await contract.methods.createInvoice(invoiceData.tokenAddress,convertToWei,invoiceData.receiverAddress).send({from:account})
            setIsSuccsee(true)
    }        
    return (
        <div className="p-4 border-4 border-blue-300">
            <h1>Create Invoice</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="tokenAddress">Token Address</label>
                    <input type="text" onChange={(e)=>onChangeHandler(e)} id="tokenAddress" value={invoiceData.tokenAddress}  />
                    </div>
                <div>
                    <label htmlFor="tokenAmount">Token Amount</label>
                    <input type="number" id="tokenAmount" value={invoiceData.tokenAmount} onChange={(e)=>onChangeHandler(e)} />
                    </div>
                <div>
                    <label htmlFor="receiverAddress">Receiver Address</label>
                    <input type="text" id="receiverAddress" value={invoiceData.receiverAddress} onChange={(e)=>onChangeHandler(e)} />
                    </div>
                <button type="submit">Create Invoice</button>
                {isSuccess && (
                    <button>
                        <a href={`http://localhost:3000/invoices/${getInvoiceId}`}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            share
                        </a>
                </button>
                )}
            </form>
        </div>
    )
}

export default CreateInvoice