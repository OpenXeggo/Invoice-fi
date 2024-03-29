import moment from 'moment';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ArrowUp from '../../assets/arrow-up.svg';
import EmailIcon from '../../assets/email.svg'

import DarkArrowUp from '../../assets/dark_upload.svg';
import DarkEmailIcon from '../../assets/dark_mail.svg'

import './Notifications.css';


const NotificationTile = ({invoice, account}) => {
    const { theme } = useSelector(state=>state.ui);
    const [time, setTime] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        const d = new Date(invoice.createdAt * 1000);
        const m = moment(d).fromNow();
        setTime(m)
    },[invoice])

    const handleRedirect = () =>{
        navigate(`/invoices/${invoice.invoiceID}`)
    }


    return ( 
        <div className='flex gap-5 m-15 pointer' onClick={handleRedirect} >
            <div className='display-flex-column'>
            <>
                {theme === "dark" ? (
                    <img src={ArrowUp} alt='email icon'/>
                ) : (
                    <img src={DarkArrowUp} alt='email icon'/>
                )}
                </>
            </div>
            <div className='noti-text'>
                {invoice.invoiceCreator === account ? (
                    <p>You sent an Invoice to <span className='underline pointer'>{invoice.receiver_name}</span></p>
                ) : (
                    <p>You received an Invoice from <span className='underline pointer'>{invoice.sender_name}</span></p>
                )}
                <p className='hours'>{time}</p>
            </div>
            <div className='flex flex-col items-center justify-center ml-auto'>
                <>
                {theme === "dark" ? (
                    <img src={EmailIcon} alt='email icon'/>
                ) : (
                    <img src={DarkEmailIcon} alt='email icon'/>
                )}
                </>
            </div>
        </div>
    );
}
 
export default NotificationTile;