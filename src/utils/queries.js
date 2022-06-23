export const getInvoices = `
    query{
        invoices {
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
