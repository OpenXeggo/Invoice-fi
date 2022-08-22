import './Button.css'

const Button = ({ Icon, text, clickHandler}) =>{
    const handleClick = () => {
        if (clickHandler) clickHandler();
    }
    return(
        <button className='primary-btn' onClick={handleClick}>
            <img src={Icon} alt='small icon'/>
            {text}
        </button>
    )
}

export default Button