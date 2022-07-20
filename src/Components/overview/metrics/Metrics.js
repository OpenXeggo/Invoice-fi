import './Metrics.css'

const Metrics = ({docsIcon, text, qty}) =>{
    return(
        <div className='metric'>
            <div className='doc-icon-wrapper display-flex-column'>
                <img src={docsIcon} alt='document icon'/>
            </div>
            <p className='text'>{text}</p>
            <p className='qty'>{qty ? 12 : 0}</p>
        </div>
    )
}

export default Metrics