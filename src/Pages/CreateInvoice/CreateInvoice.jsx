import React,{useState} from 'react'
import { initWeb3 } from '../../utils/init'
import { useNavigate } from 'react-router-dom';
import './createinvoice.css';
import PencilIcon from "../../assets/pencil.svg"
import AddIcon from "../../assets/add.svg";
import TickIcon from "../../assets/tick.svg";

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
        <span className="page-title">Create new Invoice</span>
        <span className='page-subtitle'>Invoives/New Invoice</span>
        <div className="page-content">
            <div className="invoice-details flex">
                <div className="left-details flex flex-col">
                    <div className="left-top flex flex-col gap-10">
                        <span className='title'>From:</span>
                        <span> Ayomide Odesanya <span className='icon-container'><img src={PencilIcon} alt="edit" className='pencil-icon' /></span> </span>
                        <span>Odusanyamd@gmail.com <span className='icon-container'><img src={PencilIcon} alt="edit" className='pencil-icon' /></span> </span>
                        <span>0x80191032fB4d309501d2EBc09a1A7d7F2941C8C1 <span className='icon-container'><img src={PencilIcon} alt="edit" className='pencil-icon' /></span> </span>
                    </div>
                    <div className="left-bottom flex flex-col gap-10">
                        <span>Billed to:</span>
                        <span>Enter Customers name <span className='icon-container'><img src={PencilIcon} alt="edit" className='pencil-icon' /></span> </span>
                        <span>Enter Customers Email <span className='icon-container'><img src={PencilIcon} alt="edit" className='pencil-icon' /></span> </span>
                        <span>Customers wallet address <span className='icon-container'><img src={PencilIcon} alt="edit" className='pencil-icon' /></span> </span>
                    </div>
                </div>
                <div className="right-details flex flex-col gap-10">
                    <span> <span className='icon-container'><img src={PencilIcon} alt="edit" className='pencil-icon' /></span> Issue #1</span>
                    <span> <span className='icon-container'><img src={PencilIcon} alt="edit" className='pencil-icon' /></span> Issued date 7th July 2022</span>
                    <span> <span className='icon-container'><img src={PencilIcon} alt="edit" className='pencil-icon' /></span> Due date 7th July 2022</span>
                </div>
            </div>
            <div className="token-details">
                <div className='flex gap-20 token-inputs'>
                    <div className='inline-flex flex-col gap-20'>
                        <span>Item Description</span>
                        <input type="text" placeholder='Enter Item Description' />
                    </div>
                    <div className='inline-flex flex-col gap-20 w-100 text-center'>
                        <span>Quantity</span>
                        <input type="number" placeholder='-' className='center-input' />
                    </div>
                    <div className='inline-flex flex-col gap-20 w-100 text-center'>
                        <span>Unit Price</span>
                        <input type="number" placeholder='-' className='center-input' />
                    </div>
                    <div className='inline-flex flex-col gap-20 w-100 text-center relative'>
                        <span>Vat Rate</span>
                        <input type="text" placeholder='-' className='center-input pr-10' />
                        <span className='vat' >%</span>
                    </div>
                    <div className='inline-flex flex-col gap-20 w-100 text-center'>
                        <span>Vat Amount</span>
                        <input type="number" placeholder='-' className='center-input' />
                    </div>
                    <div className='inline-flex flex-col gap-20 w-100 text-center'>
                        <span>Gross Amount</span>
                        <input type="number" placeholder='-' className='center-input' />
                    </div>
                </div>
                <div className='add-item'> <span><img src={AddIcon} className="add-icon" /></span> <span>Add Item</span></div>
            </div>
            <div className='invoice-summary flex space-between'>
                <div className="notes-container flex flex-col">
                    <span>Notes: </span>
                    <textarea name="notes" id="notes" cols="30" rows="10" placeholder='Thank you for your business' className='notes-text'></textarea>
                </div>
                <div className="invoice-total">
                    <div className="invoice-total-item">
                        <span className='label'>Total Net Amount</span>
                        <span>=</span>
                        <span>0.6</span>
                    </div>
                    <div className="invoice-total-item">
                        <span className='label'>Total Net Amount</span>
                        <span>=</span>
                        <span>0.6</span>
                    </div>
                    <div className="invoice-total-item">
                        <span className='label'>Total Net Amount</span>
                        <span>=</span>
                        <span>0.6</span>
                    </div>
                </div>
            </div>
            <div className="payment-container">
                <div className='flex flex-col gap-30'>
                    <span>Payment Options</span>
                    <div className='flex gap-30 items-center'>
                        <span className="label">Asset:</span>
                        <div className='flex'>
                            <div className='select'><span>CELO</span><span><img src={TickIcon}/></span></div>
                        </div>
                    </div>
                    <div className='flex gap-30 items-center'>
                        <span className='label'>Currency:</span>
                        <div className='flex gap-10'>
                            <div className='select'><span>cUSD</span></div>
                            <div className='select'><span>cEURO</span></div>
                            <div className='select'><span>CELO</span></div>    
                        </div> 
                    </div>
                </div>
                <div className="invoice-buttons">
                    <div className="flex gap-20">
                        <button className='xeggo-btn-outline'>Download as PDF</button>
                        <button className='xeggo-btn'>Generate Payment Link</button>
                    </div>
                </div>
            </div>



            
            {/* <div className="p-4 border-4 border-blue-300">
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
            </div> */}
        </div>
    </div>
    )
}

export default CreateInvoice