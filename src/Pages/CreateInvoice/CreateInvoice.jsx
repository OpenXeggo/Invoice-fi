import React,{useState, useRef, useMemo} from 'react'
import { initWeb3 } from '../../utils/init'
import { useNavigate } from 'react-router-dom';
import './createinvoice.css';
import PencilIcon from "../../assets/pencil.svg"
import AddIcon from "../../assets/add.svg";
import TickIcon from "../../assets/tick.svg";
import InvoiceDetail from '../../Components/InvoiceDetail';
import BinIcon from '../../assets/bin.svg';
import DateDetail from '../../Components/DateDetail';
import { useEffect } from 'react';
import moment from 'moment';
import LinksModal from '../../Components/LinksModal/LinksModal';

const CreateInvoice = ({contract,account}) => {
    const [invoiceData, setinvoiceData] = useState({
        tokenAddress:"",
        tokenAmount:0,
        receiverAddress:"",
    });
    const [invoiceId,setInvoiceId]=useState(null)

    const onChangeHandler=(e)=>{
        const {id,value} = e.target
        setinvoiceData({...invoiceData,[id]:value})
    }

    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [dueDate, setDueDate] = useState("");
    
    const [rows, setRows] = useState([{
        item: "",
        quantity: 0,
        price: 0,
        vat_rate: 0,
    }]);

    const [amounts, setAmounts] = useState([{
        net_amount: 0,
        vat_amount: 0,
        gross_amount: 0
    }])

    const [total, setTotal] = useState({
        net_amount: 0,
        vat_amount: 0,
        gross_amount:0
    })

    const [link, setLink] = useState("");

    const closeLinkModal = () => setLink("");

    const Celo = [
        {
            name: "cEUR",
            address: "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F",
        },
        {
            name:"cUSD", 
            address: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
        },
        {
            name: "Celo",
            address: ""
        }
    ]

    const [token, setToken] = useState({
            name: "cEUR",
            address: "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F",
    })

    const date = moment();
    const dateString = date.format("Do-MMMM-yy");
    


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

    const addRows = () => {
        setRows(rows=>[...rows, {
        item: "",
        quantity: 0,
        price: 0,
        vat_rate: 0,
        }]);
        setAmounts(amounts=>[...amounts, {
            net_amount: 0,
            vat_amount: 0,
            gross_amount: 0
        }])
    }

    const removeRow = (index) => {
        setRows((rows)=>{
            return rows.filter((row,i)=>{
                return i !== index
            })
        })
        setAmounts((amounts)=>{
            return amounts.filter((amount, i)=>{
                return i !== index
            })
        })
    }

    const onSubmitHandler=async(e)=>{
        try{
            e.preventDefault();
    
            let tokAddress = initWeb3().utils.isAddress(token.address);

            if(!tokAddress){
                alert('Please enter valid token Address!')
                return;
            }

            if(total.net_amount === 0) {
                alert("Please enter a valid net amount!");
                return;
            }

            if(total.gross_amount === 0){
                alert('Please enter a valid gross amount!')
                return;
            }

            try{
                let recAddress = await initWeb3().eth.getCode(customerAddress)
                if(recAddress !== '0x'){
                    alert('Please enter valid receiver Address!');
                    return;
                }
            }catch(err){
                if(err){
                    alert('Please enter valid receiver Address!')
                    return
                }
            }

            let str = total.gross_amount.toString()

            let convertToWei = initWeb3().utils.toWei(str, "ether");
            await contract.methods.createInvoice(token.address,convertToWei,customerAddress).send({from:account})   
            const id =  await contract.methods.createInvoice(token.address,total.gross_amount,customerAddress).call()
            setInvoiceId(id-1);
            let url = `https://invoice-fi.vercel.app/invoices/${id-1}`;
            setLink(url);

        } catch(err) {
            console.log(err);
            alert("Could not create invoice!");
        }
    }


    useEffect(()=>{
        let d = moment();
        setDueDate(d.format("YYYY-MM-D"));
    },[])


    useMemo(()=>{
        setAmounts((amounts)=>
            amounts.map((amount,i) => {
            let net_amount = rows[i].quantity * rows[i].price;
            let vat_amount = 0;
            if (rows[i].vat_rate > 0) {
                vat_amount = net_amount * rows[i].vat_rate / 100;
            }
            let gross_amount = vat_amount + net_amount;
            return {net_amount, vat_amount, gross_amount};
        }))
    },[rows])

    useMemo(()=>{
        let total_net = 0, total_vat = 0, total_gross = 0;
        amounts.forEach(amount=>{
            total_net += amount.net_amount;
            total_vat += amount.vat_amount;
            total_gross += amount.gross_amount
        })
        setTotal({
            net_amount: total_net,
            vat_amount: total_vat,
            gross_amount:total_gross
        })
    },[amounts])

    return (
    <div className="body-container create-container">
        <span className="page-title">Create new Invoice</span>
        <span className='page-subtitle'>Invoives/New Invoice</span>
        <div className="page-content">
            <div className="invoice-details flex">
                <div className="left-details flex flex-col">
                    <div className="left-top flex flex-col gap-10">
                        <span className='title'>From:</span>                      
                        <div>
                            <span>Ayomide Odusanya</span> 
                        </div>
                        <div>
                            <span>Odusanyamd@gmail.com</span>
                        </div>
                        <div>
                            <span>0x80191032fB4d309501d2EBc09a1A7d7F2941C8C1</span>
                        </div>
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
                    <div>
                        <span>issue #1</span>
                    </div>
                    <div>
                        <span>Issued date: {dateString}</span>
                    </div>
                    <DateDetail 
                    value={dueDate}
                    setValue={setDueDate}
                    />
                </div>
            </div>
            <div className="token-details">
                <table className='items-table'>
                    <thead>
                        <tr>
                            <th style={{textAlign: "start", minWidth: "300px"}}>Item Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Vat Rate</th>
                            <th>Vat Amount</th>
                            <th>Gross Amount</th>
                        </tr>
                    </thead>
                    {rows.map((row,i) => (
                        <tbody key={i}>
                            <tr>
                                <td><input value={row.item} onChange={(e)=>handleRow(e,i,"item")} type="text" placeholder='Enter Item Description' /></td>
                                <td><input value={row.quantity} onChange={(e)=>handleRow(e,i,"quantity")} type="number" placeholder='-' className='center-input' /></td>
                                <td><input value={row.price} onChange={(e)=>handleRow(e,i,"price")} type="number" placeholder='-' className='center-input' /></td>
                                <td className='relative'>
                                    <input type="text" value={row.vat_rate} onChange={(e)=>handleRow(e,i,"vat_rate")} placeholder='-' className='center-input pr-10' />
                                    <span className='vat' >%</span>
                                </td>
                                <td><input type="number" value={amounts[i].vat_amount} onChange={(e)=>handleRow(e,i,"vat_amount")} placeholder='-' className='center-input' /></td>
                                <td><input type="number" value={amounts[i].gross_amount} onChange={(e)=>handleRow(e,i,"gross_amount")} placeholder='-' className='center-input' /></td>
                                {i > 0 && <td><span className='pointer' onClick={()=>removeRow(i)}><img src={BinIcon} alt="Delete" /></span></td>}
                            </tr>
                        </tbody>
                    ))}
                </table>
                <div className='add-item' onClick={()=>addRows()}> <span><img src={AddIcon} className="add-icon" /></span> <span>Add Item</span></div>
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
                        <span>{total.net_amount}</span>
                    </div>
                    <div className="invoice-total-item">
                        <span className='label'>Total VAT Amount</span>
                        <span>=</span>
                        <span>{total.vat_amount}</span>
                    </div>
                    <div className="invoice-total-item">
                        <span className='label'>Total Gross Amount</span>
                        <span>=</span>
                        <span>{total.gross_amount}</span>
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
                            {Celo.map((celotoken, i)=>(
                                <div key={i} className='select' onClick={()=>setToken({...celotoken})}>
                                    <span>{celotoken.name}</span>
                                    {celotoken.name === token.name && <span><img src={TickIcon}/></span>}
                                </div>
                            ))}
                        </div> 
                    </div>
                </div>
                <div className="invoice-buttons">
                    <div className="flex gap-20">
                        <button className='xeggo-btn-outline'>Download as PDF</button>
                        <button className='xeggo-btn' onClick={onSubmitHandler}>Generate Payment Link</button>
                    </div>
                </div>
            </div>
            {link.length > 1 && <LinksModal link={link} closeModal={closeLinkModal} />}
        </div>
    </div>
    )
}

export default CreateInvoice