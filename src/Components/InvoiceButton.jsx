import bigNumber from 'big-number';
import Token from '../Token.json';
import { ethers } from "ethers";
import { networks } from "../network.config.json";
import { useSelector } from "react-redux/es/exports";
import { initWeb3 } from "../utils/init";

const InvoiceButton = ({ invoice, account, contract }) => {
  const { chainId, isSupported } = useSelector((state) => state.network);
  const web3 = initWeb3();

  console.log(invoice)

  const payHandler = async (
    e,
    { tokenAddress, tokenAmountInWei, invoiceID }
  ) => {
    const token = new web3.eth.Contract(Token, tokenAddress);
    const contractAddress = networks[chainId]?.contractAddress;
    console.log(contractAddress, token, tokenAddress);
    console.log(await token.methods.name().call(), "allowanceAmount");
    const allowanceAmount = await token.methods
      .allowance(account, contractAddress)
      .call();
    console.log(allowanceAmount);

    console.log(contractAddress, tokenAmountInWei, "Test");
    console.log("out");
    if (bigNumber(allowanceAmount).lt(tokenAmountInWei)) {
      console.log("in");
      let tx = await token.methods
        .approve(contractAddress, tokenAmountInWei)
        .send({
          from: account,
          gasLimit: 280000,
          gasPrice: initWeb3().utils.toWei("40", "gwei"),
        });

      // Approve tx receipt
      console.log("tx", tx);
    }

   
  
    const pay = await contract.methods.payInvoice(invoiceID).send({
      from: account,

      gasPrice: initWeb3().utils.toWei("40", "gwei"),
    });
    console.log(pay);
  };

  const cancelHandler = async (e, { invoiceID }) => {
    try {
      e.stopPropagation();

      await contract.methods.cancelInvoice(invoiceID).send({
        from: account,
        gasLimit: 210000,
        gasPrice: initWeb3().utils.toWei("40", "gwei"),
      });
      alert("Invoice cancelled successfully");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      {invoice.invoiceCreator === account ? (
        <div onClick={(e) => e.stopPropagation()}>
          {invoice.isCancelled ? (
            "Cancelled"
          ) : invoice.isPaid ? (
            "Paid"
          ) : (
            <button
              className="xeggo-button"
              onClick={(e) => cancelHandler(e, invoice)}
            >
              Cancel Invoice
            </button>
          )}
        </div>
      ) : (
        <div onClick={(e) => e.stopPropagation()}>
          {invoice.isPaid ? (
            "Paid"
          ) : invoice.isCancelled ? (
            "Cancelled"
          ) : (
            <button
              className="xeggo-button"
              onClick={(e) => payHandler(e, invoice)}
            >
              Pay Invoice
            </button>
          )}
        </div>
      )}
    </div>
  );
};
 
export default InvoiceButton;