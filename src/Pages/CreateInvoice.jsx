import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const CreateInvoice = ({contract,account}) => {
    const navigate = useNavigate();

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
        try{
            e.preventDefault();
            await contract.methods.createInvoice(invoiceData.tokenAddress,invoiceData.tokenAmount,invoiceData.receiverAddress).send({from:account});
            navigate('/');
        } catch(err) {
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