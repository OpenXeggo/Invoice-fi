import bigNumber from 'big-number';
import Token from '../Token.json';
import { initContract, initWeb3 } from '../utils/init';

const InvoiceButton = ({invoice, account}) => {
    const web3 = initWeb3();
    const contract = initContract();

    const payHandler = async ({ tokenAddress, tokenAmountInWei, invoiceID }) => {
        const token = new web3.eth.Contract(Token, tokenAddress);
    
        const allowanceAmount = await token.methods
          .allowance(account, '0x38399AC5E7d8b75531AC676D649a6451C7a22599')
          .call();
    
        if (bigNumber(allowanceAmount).lt(tokenAmountInWei)) {
          let tx = await token.methods
            .approve(
              '0x38399AC5E7d8b75531AC676D649a6451C7a22599',
              bigNumber(tokenAmountInWei)
            )
            .send({ from: account, gasLimit: 280000 });
    
          // Approve tx receipt
          console.log('tx', tx);
        }
    
        const allowanceAmount1 = await token.methods
          .allowance(account, '0x38399AC5E7d8b75531AC676D649a6451C7a22599')
          .call();
        console.log(allowanceAmount1);
    
        const pay = await contract.methods
          .payInvoice(invoiceID)
          .send({ from: account, gasLimit: 280000 });
        console.log(pay);
      };
    
    
      const cancelHandler = async ({ invoiceID }) => {
        try {
          await contract.methods
            .cancelInvoice(invoiceID)
            .send({ from: account, gasLimit: 210000 });
          alert('Invoice cancelled successfully');
        } catch (e) {
          alert(e.message);
        }
      };

    return (
        <div>
            {invoice.invoiceCreator === account ? (
            <div onClick={e=>e.stopPropagation()}>
                {invoice.isCancelled ? (
                'Cancelled'
                ) : invoice.isPaid ? (
                'Paid'
                ) : (
                <button className='xeggo-button' onClick={() => cancelHandler(invoice)}>Cancel</button>
                )}
            </div>
            ) : (
            <div onClick={e=>e.stopPropagation()}>
                {invoice.isPaid ? (
                'Paid'
                ) : invoice.isCancelled ? (
                'Cancelled'
                ) : (
                <button className='xeggo-button' onClick={() => payHandler(invoice)}>Pay</button>
                )}
            </div>
            )}
        </div>
        );

}
 
export default InvoiceButton;