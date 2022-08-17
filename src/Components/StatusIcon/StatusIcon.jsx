import "./statusicon.css";

const StatusIcon = ({type}) => {

    return ( 
        <>
        {type === "paid" ? (
            <div className="status-box paid">
                <div className="status-text paid">Paid</div>
            </div>
        ) : type === "overdue" ? (
            <div className="status-box overdue">
                <div className="status-text overdue">Overdue</div>
            </div>
        ) : type === "pending" && (
            <div className="status-box pending">
                <div className="status-text pending">Pending</div>
            </div>
        )}
        </>
    );
}
 
export default StatusIcon;