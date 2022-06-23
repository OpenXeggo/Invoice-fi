export const modifyAddress = (address, length) => {
    if (length === 5) {
      return `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;
    }
  
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};