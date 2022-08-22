import { useEffect, useState } from "react";
import { useSelector,  } from "react-redux/es/exports";
import "./statusicon.css";

const StatusIcon = ({invoice}) => {

    const [status, setStatus] = useState("pending")
    const { address } = useSelector(state=>state.user);

    useEffect(()=>{
        if(address) {
            if(invoice.isPaid){
                setStatus("paid");
                return;
            }
            else if(invoice.isCancelled){
                setStatus("cancelled")
            }
            else{
                setStatus("pending")
            }
        }
    },[])



    return ( 
        <>
        {status === "paid" ? (
            <div className="status-box paid">
                <div className="status-text paid">Paid</div>
            </div>
        ) : status === "cancelled" ? (
            <div className="status-box overdue">
                <div className="status-text overdue">Cancelled</div>
            </div>
        ) : status === "pending" && (
            <div className="status-box pending">
                <div className="status-text pending">Pending</div>
            </div>
        )}
        </>
    );
}
 
export default StatusIcon;