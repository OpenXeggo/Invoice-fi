import PencilIcon from "../assets/pencil.svg";
import moment from 'moment';
import { useEffect, useState } from "react";

const DateDetail = ({value, setValue}) => {

    const [date, setDate] = useState("");
    
    const currentDate = moment().format('YYYY-MM-DD');


    const handleEdit = (e) => {
        const input = e.currentTarget.lastElementChild;
        console.log(input);
        input.style.display = "block";
        input.focus();
        input.previousElementSibling.style.display = "none";
    }

    const handleBlur = (e) => {
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
        let d = e.target.valueAsNumber;
        setValue(moment(d).format("YYYY-MM-DD"));
    }

    useEffect(()=>{
        let d = new Date(value);
        d = moment(d);
        setDate(d.format("Do-MMMM-yy"));
    },[value])

    return ( 
        <div className='relative pointer invoice-detail' onClick={handleEdit} > 
            <div className="text">
                <span className='icon-container'>
                    <img src={PencilIcon} alt="edit" className='pencil-icon' />
                </span> 
                <span>Payment Date: {date}</span> 
            </div>
            <input type="date" className='details-input' onBlur={handleBlur} onKeyDown={handleCheck} onChange={handleChange} max="30" value={value} min={currentDate}/>
        </div>
    );
}
 
export default DateDetail;