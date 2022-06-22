export const getInvoices = `
    query{
        invoices(first: 15) {
            id
            invoiceID
            invoiceCreator
            tokenAddress 
            tokenAmountInWei
            receiver
            isPaid
            isCancelled
            createdAt
            PaidAt
          }
    }
`;
