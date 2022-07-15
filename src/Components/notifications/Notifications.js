import ArrowUp from '../../assets/arrow-up.svg';
import EmailIcon from '../../assets/email.svg'
import NotiErrImg from '../../assets/notification-error.png'
import './Notifications.css'

const Notifications = ({account}) =>{

    const notifications = [
        {
            arrIcon: ArrowUp,
            name: "Aman Nabi",
            hours: "3 hours ago",
            emailIcon: EmailIcon
        },
        {
            arrIcon: ArrowUp,
            name: "Aman Nabi",
            hours: "3 hours ago",
            emailIcon: EmailIcon
        },
        {
            arrIcon: ArrowUp,
            name: "Aman Nabi",
            hours: "3 hours ago",
            emailIcon: EmailIcon
        },
        {
            arrIcon: ArrowUp,
            name: "Aman Nabi",
            hours: "3 hours ago",
            emailIcon: EmailIcon
        },
    ];

    return(
        <div className='notifications-wrapper'>
            <div className='rectangle'></div>
            <div className='notifications display-flex-column'>
                <div className='noti-heading display-flex-row'>
                    <p className='black'>Notifications</p>
                    <p className='gray'>Mark all as read</p>
                </div>
                {account? (
                    notifications.map(({arrIcon,name,hours,emailIcon}, index) =>(
                        <div className='display-flex-row m-15' key={index}>
                            <div className='display-flex-column'>
                                <img src={arrIcon} alt='arrow up icon'/>
                            </div>
                            <div className='noti-text'>
                                <p>You sent an Invoice to <span style={{textDecoration:"underline",color:"#FAFAFA"}}>{name}</span></p>
                                <p className='hours'>{hours}</p>
                            </div>
                            <div className='display-flex-column'>
                                <img src={emailIcon} alt='email icon'/>
                            </div>
                        </div>
                    ))
                ):(
                    <div className='noti-err display-flex-column'>
                        <img src={NotiErrImg} alt=''/>
                        <p>Nothing to see here!!</p>
                    </div>
                )}  
            </div>
        </div>
    )
}

export default Notifications