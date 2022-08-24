import NotiErrImg from '../../assets/notification-error.png'
import './Notifications.css';
import NotificationTile from './NotificationTile';
import { getParticularInvoice } from '../../utils/dbQueries';
import { useState , useEffect } from 'react';


const Notifications = ({account, invoices}) =>{

    const [notifications, setNotifications] = useState([]);

    const handleInvoiceData = async (invoice) => {
        try{
            const data = await getParticularInvoice(invoice.invoiceID);
            if (data) {
                const {  attributes , id  } = data;
                setNotifications(notifications=>{
                    return [...notifications, { id, ...attributes, ...invoice }]
                });
            }
            
        } catch (e){
            console.log(e)
        }
    }

    useEffect(()=>{
        setNotifications([])
        if(notifications.length === 0) {
            invoices.forEach(invoice=>{
                handleInvoiceData(invoice);
            })
        }
    },[invoices])



    return(
        <div className='notifications-wrapper'>
            <div className='rectangle'></div>
            <div className='notifications display-flex-column'>
                <div className='noti-heading display-flex-row'>
                    <p className='black'>Notifications</p>
                    <p className='gray'>Mark all as read</p>
                </div>
                <div className='notifications-list'>
                    {notifications.length > 0 ? (
                        notifications.map((invoice, i) =>(
                            <>
                                <NotificationTile invoice={invoice} key={i} account={account} />
                            </>
                        ))
                    ):(
                        <div className='noti-err display-flex-column'>
                            <img src={NotiErrImg} alt=''/>
                            <p>Nothing to see here!!</p>
                        </div>
                    )} 
                </div> 
            </div>
        </div>
    )
}

export default Notifications