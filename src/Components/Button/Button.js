import './Button.css'

const Button = ({ Icon, text}) =>{
    return(
        <button className='primary-btn'>
            <img src={Icon} alt='small icon'/>
            {text}
        </button>
    )
}

export default Button