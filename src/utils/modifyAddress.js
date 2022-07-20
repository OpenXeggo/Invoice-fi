export const modifyAddress = (address, length) => {
    if (address.length < 1) return "------";

    if (length === 5) {
      return `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;
    }
  
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};