import PencilIcon from "../assets/pencil.svg"

const InvoiceDetail = ({value, setValue, placeholder}) => {

    const handleEdit = (e) => {
        const input = e.currentTarget.lastElementChild;
        console.log(input);
        input.style.display = "block";
        input.focus();
        input.previousElementSibling.style.display = "none";

    }

    const handleBlur = (e) => {
        console.log("blurred");
        e.target.style.display = "none";
        e.target.previousElementSibling.style.display = "block";
    }

    const handleCheck = (e) => {
        if (e.keyCode === 13) {
            console.log("Enter pressed");
            e.target.blur();
        }
    }

    const handleChange = (e) => {
        setValue(e.target.value);
        console.log(value);
    }

    return ( 
        <div className='relative pointer invoice-detail' onClick={handleEdit} > 
            <div className="text">
                <span>{value.length ? value : placeholder}</span> 
                <span className='icon-container'>
                    <img src={PencilIcon} alt="edit" className='pencil-icon' />
                </span> 
            </div>
            <input type="text" className='details-input' onBlur={handleBlur} onKeyDown={handleCheck} onChange={handleChange} max="30" value={value} />
        </div>
    );
}
 
export default InvoiceDetail;