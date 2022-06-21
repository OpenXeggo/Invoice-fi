import React,{useState} from 'react'

const CancelInvoice = ({contract, account}) => {
    const [invoiceID, setinvoiceID] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        let result = await cancelInvoice(invoiceID);
        console.log(result);
    }

    const cancelInvoice = async (id) => {
        try {
            let result = await contract.methods.cancelInvoice(id).send({from:account, gas:200000});
            return result;
        }
        catch (e) {
            return {error: "Cannot specify error type", e};
        }
    }

  return (
    <div className="p-4 border-2 border-black border-solid">
        <h1>Cancel Invoice</h1>
        <form onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="receiverAddress">Invoice ID</label>
                <input type="text" id="receiverAddress" value={invoiceID} onChange={(e)=>setinvoiceID(e.target.value)} />
                </div>
            <button type="submit">Cancel Invoice</button>
        </form>
    </div>
  )
}

export default CancelInvoice