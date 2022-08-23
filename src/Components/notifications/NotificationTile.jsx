import ArrowUp from '../../assets/arrow-up.svg';
import EmailIcon from '../../assets/email.svg'
import NotiErrImg from '../../assets/notification-error.png'
import './Notifications.css';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';

const NotificationTile = ({invoice, account}) => {

    const [time, setTime] = useState();

    useEffect(()=>{
        const d = new Date(invoice.createdAt * 1000);
        const m = moment(d).fromNow();
        setTime(m)
    },[invoice])


    return ( 
        <div className='display-flex-row m-15' >
            <div className='display-flex-column'>
                <img src={ArrowUp} alt='arrow up icon'/>
            </div>
            <div className='noti-text'>
                {invoice.invoiceCreator === account ? (
                    <p>You sent an Invoice to <span className='underline'>{invoice.receiver_name}</span></p>
                ) : (
                    <p>You received an Invoice from <span className='underline'>{invoice.sender_name}</span></p>
                )}
                <p className='hours'>{time}</p>
            </div>
            <div className='display-flex-column'>
                <img src={EmailIcon} alt='email icon'/>
            </div>
        </div>
    );
}
 
export default NotificationTile;