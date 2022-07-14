import React,{useState, useRef} from 'react'
import { initWeb3 } from '../../utils/init'
import { useNavigate } from 'react-router-dom';
import './createinvoice.css';
import PencilIcon from "../../assets/pencil.svg"
import AddIcon from "../../assets/add.svg";
import TickIcon from "../../assets/tick.svg";
import InvoiceDetail from '../../Components/InvoiceDetail';

const CreateInvoice = ({contract,account}) => {
    const [invoiceData, setinvoiceData] = useState({
        tokenAddress:"",
        tokenAmount:0,
        receiverAddress:"",
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [issueNumber, setIssueNumber] = useState("issue #1");
    const [issueDate, setIssueDate] = useState("Issued date 7th July 2022");
    const [dueDate, setDueDate] = useState("Due date 7th July 2022");
    
    const [rows, setRows] = useState([{
        item: "",
        quantity: 0,
        price: 0,
        vat_rate: 0,
        vat_amount: 0,
        gross_amount: 0
    }]);


    const navigate = useNavigate();
    
    const [invoiceId,setInvoiceId]=useState(null)

    const onChangeHandler=(e)=>{
        const {id,value} = e.target
        setinvoiceData({...invoiceData,[id]:value})
    }


    const handleRow = (e, index, field) => {
        setRows(rows=>{
            return rows.map((row,i) => {
                if (i === index) {
                    return {...row, [field]: e.target.value}
                }
                else return row;
            })
        })
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
    <div className="body-container create-container">
        <span className="page-title">Create new Invoice</span>
        <span className='page-subtitle'>Invoives/New Invoice</span>
        <div className="page-content">
            <div className="invoice-details flex">
                <div className="left-details flex flex-col">
                    <div className="left-top flex flex-col gap-10">
                        <span className='title'>From:</span>                      
                        <InvoiceDetail 
                        value={name}
                        setValue={setName}
                        placeholder="Enter your name"
                        />
                        <InvoiceDetail 
                        value={email}
                        setValue={setEmail}
                        placeholder="Enter your email"
                        />
                        <InvoiceDetail
                        value={address}
                        setValue={setAddress}
                        placeholder="Enter your Wallet Address"
                        />
                    </div>
                    <div className="left-bottom flex flex-col gap-10">
                        <span>Billed to:</span>
                        <InvoiceDetail 
                        value={customerName}
                        setValue={setCustomerName}
                        placeholder="Enter Customer Name"
                        />
                        <InvoiceDetail 
                        value={customerEmail}
                        setValue={setCustomerEmail}
                        placeholder="Enter Customer Email"
                        />
                        <InvoiceDetail 
                        value={customerAddress}
                        setValue={setCustomerAddress}
                        placeholder="Enter Customer Address"
                        />
                    </div>
                </div>
                <div className="right-details flex flex-col gap-10">
                    <InvoiceDetail 
                    value={issueNumber}
                    setValue={setIssueNumber}
                    />
                    <InvoiceDetail 
                    value={issueDate}
                    setValue={setIssueDate}
                    />
                    <InvoiceDetail 
                    value={dueDate}
                    setValue={setDueDate}
                    />
                </div>
            </div>
            <div className="token-details">
                <table className='items-table'>
                    <tr>
                        <th style={{textAlign: "start", minWidth: "300px"}}>Item Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Vat Rate</th>
                        <th>Vat Amount</th>
                        <th>Gross Amount</th>
                    </tr>
                    {rows.map((row,i) => (
                        <tr key={i}>
                            <td><input value={row.item} onChange={(e)=>handleRow(e,i,"item")} type="text" placeholder='Enter Item Description' /></td>
                            <td><input value={row.quantity} onChange={(e)=>handleRow(e,i,"quantity")} type="number" placeholder='-' className='center-input' /></td>
                            <td><input value={row.price} onChange={(e)=>handleRow(e,i,"price")} type="number" placeholder='-' className='center-input' /></td>
                            <td className='relative'>
                                <input type="text" value={row.vat_rate} onChange={(e)=>handleRow(e,i,"vat_rate")} placeholder='-' className='center-input pr-10' />
                                <span className='vat' >%</span>
                            </td>
                            <td><input type="number" value={row.vat_amount} onChange={(e)=>handleRow(e,i,"vat_amount")} placeholder='-' className='center-input' /></td>
                            <td><input type="number" value={row.gross_amount} onChange={(e)=>handleRow(e,i,"gross_amount")} placeholder='-' className='center-input' /></td>
                        </tr>
                    ))}
                </table>
                <div className='add-item' onClick={()=>setRows(rows=>[...rows, 1])}> <span><img src={AddIcon} className="add-icon" /></span> <span>Add Item</span></div>
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