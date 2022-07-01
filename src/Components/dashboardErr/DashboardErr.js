import ErrImg from '../../assets/dash-error.svg'
import './dashboardErr.css'

const DashboardErr = () =>{
    return(
        <div className='error-img-wrapper'>
            <img src={ErrImg} alt=''/>
            <p>No Transaction Yet</p>
        </div>
    )
}

export default DashboardErr