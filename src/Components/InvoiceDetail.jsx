import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

import PencilIcon from "../assets/pencil.svg";

const InvoiceDetail = ({value, setValue, placeholder}) => {

    const [showInput, setShowInput] = useState(false);
    const field = useRef();


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
        setValue(e.target.value);
    }

    useEffect(()=>{
        if(field.current && showInput) {
            field.current.focus();
        }
    },[showInput, field])

    return ( 
        <div className=' pointer invoice-detail' > 
            {!showInput ? (
                <div className="text">
                    <span>{value.length ? value : placeholder}</span> 
                    <span className='icon-container' onClick={handleEdit}>
                        <img src={PencilIcon} alt="edit" className='pencil-icon' />
                    </span> 
                </div>
            ) : (
                <input type="text" className='details-input mb-5' 
                    onBlur={handleBlur} 
                    onKeyDown={handleCheck} 
                    onChange={handleChange} 
                    max="30" 
                    value={value} 
                    ref={field}
                />
            )}
        </div>
    );
}
 
export default InvoiceDetail;