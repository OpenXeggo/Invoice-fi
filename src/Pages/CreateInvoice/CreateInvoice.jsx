import React,{useState, useMemo} from 'react'
import { initWeb3 } from '../../utils/init'
import { networks } from "../../network.config.json";
import { useDispatch, useSelector } from "react-redux";  
import './createinvoice.css';
import AddIcon from "../../assets/add.svg";
import DarkAddIcon from "../../assets/dark_plus_icon.svg";
import TickIcon from "../../assets/tick.svg";
import InvoiceDetail from '../../Components/InvoiceDetail';
import BinIcon from '../../assets/bin.svg';
import DateDetail from '../../Components/DateDetail';
import { useEffect } from 'react';
import moment from 'moment';
import LinksModal from '../../Components/LinksModal/LinksModal';
import PlusIcon from "../../assets/plus.svg";
import AddTokenModal from '../../Components/AddTokenModal/AddTokenModal';
import { useMoralis } from 'react-moralis';
import { addInvoice } from '../../utils/dbQueries'
import { ethers } from 'ethers';

const CreateInvoice = ({contract, account}) => {
    const { chainId, isSupported } = useSelector((state) => state.network);
    const { firstname, lastname, email, user_id } = useSelector(state=>state.user.userData);
    const {theme} = useSelector(state=>state.ui);

    const dispatch = useDispatch();

    const { user } = useMoralis();

    const [customToken, setCustomToken] = useState(false);

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [notes, setNotes] = useState("");
    const [nextInvoiceID,setNextInvoiceID] = useState("1");
    
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

    const [assets, setAssets] = useState([]);
    const [selectedToken, setSelectedToken] = useState({});
    const [token, setToken] = useState({});

    const date = moment();
    const dateString = date.format("Do-MMMM-yy");

    const selectAsset = (item) => {
        setSelectedToken({...item})
    }

    useEffect(()=>{
        const getNextInvoiceId=async()=>{
            const nextInvoiceId = await contract.methods.getNextInvoiceID().call()
            
            setNextInvoiceID(nextInvoiceId)
        }
        if(isSupported && contract._address!==ethers.constants.AddressZero ){
           getNextInvoiceId()
        }
    },[isSupported,contract])

    useEffect(()=>{
        if(assets.length)
        setToken({...selectedToken.currencies[0]})
    },[selectedToken])
    
    useEffect(()=>{
        if(isSupported && networks[chainId]?.tokens.length){
            setAssets(networks[chainId].tokens)
            setSelectedToken(networks[chainId].tokens[0])
            setToken(networks[chainId].tokens[0].currencies[0])
        }
    },[chainId,isSupported])


    const handleRow = (e, index, field) => {
        setRows(rows=>{
            return rows.map((row,i) => {
                let value = e.target.value;
                if (i === index) {
                    return {...row, [field]: value}
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

    const saveInvoiceToUser = (id) => {
        return new Promise( async (resolve, reject)=>{
            try{
                user.addUnique("invoices", id);
                await user.save()
                resolve({ok: true, message: "completed"})
            } catch (e) {
                reject({ok: false, message: "Could not add Invoice"});
            }
        })
    }

    

    const onSubmitHandler=async(e)=>{
        try{
            e.preventDefault();
    
            let tokAddress = initWeb3().utils.isAddress(token.address);

            if(customerName.length === 0){
                alert('Please enter Customer name!')
                return;
            }

            if(customerAddress.length === 0){
                alert('Please enter Customer Address!')
                return;
            }

            if(customerEmail.length === 0){
                alert('Please enter Customer Email!')
                return;
            }

            if(dueDate.length === 0){
                alert('Please enter due Date!')
                return;
            }

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
            await contract.methods.createInvoice(token.address,convertToWei,customerAddress).send({from:account,  gasPrice: initWeb3().utils.toWei("40", "gwei")})   
            const id =  await contract.methods.createInvoice(token.address,convertToWei,customerAddress).call();
            const invoice_id = id - 1;
            // setInvoiceId(id-1);

            const invoiceData = {
                sender_address: account,
                sender_id: user_id,
                sender_name: `${firstname} ${lastname}`,
                sender_email: email,
                receiver_name: customerName,
                receiver_email: customerEmail,
                receiver_address: customerAddress,
                date_created: dateString,
                date_due: dueDate,
                invoice_id,
                net_amount: total.net_amount,
                gross_amount: total.gross_amount,
                vat_amount: total.vat_amount,
                notes: notes,
                items: [...rows],
                token_details: {...token, asset_name: selectedToken.tokenName},
                native_currency:{
                    name: "",
                    token_address: ""
                },
                status: "pending"
            }

            await addInvoice(invoiceData);
            await saveInvoiceToUser(id);
            dispatch({type: "ADD_INVOICE_ID", payload: id});

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
            let vat_rate = Number(rows[i].vat_rate);
            let net_amount = rows[i].quantity * rows[i].price;
            let vat_amount = 0;
            if (vat_rate > 0) {
                vat_amount = net_amount * vat_rate / 100;
                console.log({vat_amount,net_amount})
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
                            <span>{`${firstname} ${lastname}`}</span> 
                        </div>
                        <div>
                            <span>{email}</span>
                        </div>
                        <div>
                            <span>{account}</span>
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
                        <span>issue #{nextInvoiceID}</span>
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
                                <td><input type="number" value={amounts[i].vat_amount} onChange={(e)=>handleRow(e,i,"vat_amount")} placeholder='-' className='center-input' readOnly /></td>
                                <td><input type="number" value={amounts[i].gross_amount} onChange={(e)=>handleRow(e,i,"gross_amount")} placeholder='-' className='center-input' readOnly /></td>
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
                    <textarea name="notes" id="notes" cols="30" rows="10" 
                        placeholder='Thank you for your business' 
                        className='notes-text' value={notes} 
                        onChange={(e)=>setNotes(e.target.value)}
                    ></textarea>
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
                        <div className='flex gap-10 flex-wrap'>
                            {assets.length ? assets.map(item=>(
                                <div className='select' onClick={()=>selectAsset(item)}>
                                    <span>{item.tokenName}</span>
                                    {item.tokenName === selectedToken.tokenName && <span><img src={TickIcon}/></span>}
                                </div>
                            )):null}
                            <div className='select' onClick={()=>setCustomToken(true)} >
                                <span><img src={theme === "light" ? DarkAddIcon : PlusIcon } alt="" /></span>
                                <span>Add Custom Token</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-30 items-center'>
                        {assets.length ? <span className='label'>Currency:</span>:null}
                        <div className='flex gap-10 flex-wrap'>
                            {assets.length ? selectedToken.currencies.map((celotoken, i)=>(
                                <div key={i} className='select' onClick={()=>setToken({...celotoken})}>
                                    <span>{celotoken.name}</span>
                                    {celotoken.name === token.name && <span><img src={TickIcon}/></span>}
                                </div>
                            )):null}
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
        {customToken && <AddTokenModal setCustomToken={setCustomToken} setAssets={setAssets} assets={assets} setToken={setToken} setSelectedToken={setSelectedToken} />}
    </div>
    )
}

export default CreateInvoice