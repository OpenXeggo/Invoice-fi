import CalenderIcon from '../../assets/calender.svg'
import ArrowDownIcon from '../../assets/arrow-icon.svg'
import DocsIcon from '../../assets/docs.svg'
import Metrics from './metrics/Metrics'
import './overview.css'

const Overview = ({account,invoiceStats}) =>{
    console.log("inv stats",invoiceStats)

    return(
        <div className='w-h'>
            <div className='w-100 display-flex-row'>
                <p>Overview</p>
                <div className='days-lasted display-flex-row'>
                    <img src={CalenderIcon} alt='calender icon'/>
                    <p>Last 7 Days</p>
                    <img src={ArrowDownIcon} alt='down arrow icon'/>
                </div>
            </div>
            <div className='metrics-container display-flex-row'>
                <Metrics docsIcon={DocsIcon} text={'Clients'} qty={invoiceStats.clients}/>
                <Metrics docsIcon={DocsIcon} text={'INVOICES'} qty={invoiceStats.invoices}/>
                <Metrics docsIcon={DocsIcon} text={'PAID'} qty={invoiceStats.paid}/>
                <Metrics docsIcon={DocsIcon} text={'PENDING'} qty={invoiceStats.pending}/>
            </div>
        </div>
    )
}

export default Overview