import PencilIcon from "../assets/pencil.svg";
import moment from 'moment';
import { useEffect, useState, useRef } from "react";

const DateDetail = ({value, setValue}) => {

    const [date, setDate] = useState("");
    const field = useRef();
    
    const currentDate = moment().format('YYYY-MM-DD');

    const [showInput, setShowInput] = useState(false);

    const handleEdit = (e) => {
        setShowInput(true);
    }

    const handleBlur = (e) => {
        setShowInput(false);
    }

    const handleCheck = (e) => {
        if (e.keyCode === 13) {
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

    useEffect(()=>{
        if(field.current && showInput) {
            field.current.focus();
        }
    },[showInput, field])

    return ( 
        <div className='relative pointer invoice-detail'  > 
            {!showInput ? (
                <div className="text">
                    <span className='icon-container' onClick={handleEdit}>
                        <img src={PencilIcon} alt="edit" className='pencil-icon' />
                    </span> 
                    <span>Payment Date: {date}</span> 
                </div>
            ) : (
                <input type="date" className='details-input' onBlur={handleBlur} onKeyDown={handleCheck} onChange={handleChange} max="30" value={value} min={currentDate} ref={field} />
            )}
        </div>
    );
}
 
export default DateDetail;