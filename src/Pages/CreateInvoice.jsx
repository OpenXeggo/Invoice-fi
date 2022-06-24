import React,{useState} from 'react'
import { initWeb3 } from '../utils/init'
import { useNavigate } from 'react-router-dom'

const CreateInvoice = ({contract,account}) => {
    const [invoiceData, setinvoiceData] = useState({
        tokenAddress:"",
        tokenAmount:0,
        receiverAddress:"",
    })

    const navigate = useNavigate();
    
    const [invoiceId,setInvoiceId]=useState(null)

    const onChangeHandler=(e)=>{
        const {id,value} = e.target
        setinvoiceData({...invoiceData,[id]:value})
    }

    const onSubmitHandler=async(e)=>{
        try{
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
            await contract.methods.createInvoice(invoiceData.tokenAddress,convertToWei,invoiceData.receiverAddress).send({from:account})   
            const id =  await contract.methods.createInvoice(invoiceData.tokenAddress,invoiceData.tokenAmount,invoiceData.receiverAddress).call()
            setInvoiceId(id-1);
            alert(`https://invoice-fi.vercel.app/invoices/${id-1}`);
            // navigate('/');
        } catch(err) {
            console.log(err)
            alert("Could not create invoice!");
        }
    }
    return (
    <div className="body-container">
        <span className="page-title">Create Invoice</span>
        <div className="page-content">
            <div className="p-4 border-4 border-blue-300">
                <form onSubmit={onSubmitHandler} className="form">
                    <div className="form-container">
                        <div>
                            <label htmlFor="tokenAddress">Token Address: </label>
                            <input type="text" onChange={(e)=>onChangeHandler(e)} id="tokenAddress" value={invoiceData.tokenAddress}  />
                        </div>
                        <div>
                            <label htmlFor="tokenAmount">Token Amount: </label>
                            <input type="number" id="tokenAmount" value={invoiceData.tokenAmount} onChange={(e)=>onChangeHandler(e)} />
                        </div>
                        <div>
                            <label htmlFor="receiverAddress">Receiver Address: </label>
                            <input type="text" id="receiverAddress" value={invoiceData.receiverAddress} onChange={(e)=>onChangeHandler(e)} />
                        </div>
                        <div>
                            <button type="submit" className='xeggo-button'>Create Invoice</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default CreateInvoice