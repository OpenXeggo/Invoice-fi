// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

/**
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This module is used through inheritance. It will make available the
 * modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 * the functions of your contract. Note that they will not be pausable by
 * simply including this module, only once the modifiers are put in place.
 */
abstract contract Pausable is Context {
    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    bool private _paused;

    /**
     * @dev Initializes the contract in unpaused state.
     */
    constructor() {
        _paused = false;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view virtual returns (bool) {
        return _paused;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        require(!paused(), "Pausable: paused");
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        require(paused(), "Pausable: not paused");
        _;
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}

// CAUTION
// This version of SafeMath should only be used with Solidity 0.8 or later,
// because it relies on the compiler's built in overflow checks.

/**
 * @dev Wrappers over Solidity's arithmetic operations.
 *
 * NOTE: `SafeMath` is generally not needed starting with Solidity 0.8, since the compiler
 * now has built in overflow checking.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the substraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}

/**
 * @title Owner
 * @dev Set & change owner
 */
contract Owner {

    address private owner;
    
    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    
    // modifier to check if caller is owner
    modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    /**
     * @dev Set contract deployer as owner
     */
    constructor() {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Return owner address 
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }
}

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @dev Contract to allow generate Invoice which can be paid by others.
 */
contract Billing is Pausable,Owner {

    using SafeMath for uint;

    // Events created for creating logs 
    event InvoiceCreated(
        uint invoiceID,
        address invoiceCreator,
        address tokenAddress,
        uint tokenAmountInWei,      
        address receiver
    );
    event InvoiceCancelled(
        uint invoiceID
    );
    event InvoicePaid(
        uint invoiceID,
        address isPaidBy,
        bool byReceiver
    );

    uint _invoiceID;

    struct invoice {
        address _invoiceCreator;
        address _tokenAddress;
        uint _tokenAmountInWei;      
        address payable _receiver;
        address _isPaidBy;
        bool _isCancelled;
    }

    mapping (uint => invoice) public invoices;

    /**
     * @dev Constructer to Initialize _invoiceID to 1
     */
    constructor(){
        _invoiceID = 1;
    }

    /**
     * @dev Return next Invoice ID, useful for making stream links. 
     * @return nextInvoiceID Next Invoice ID
     */
    function getNextInvoiceID() external view returns (uint nextInvoiceID){
        return _invoiceID;
    }

    /**
     * @dev Get details of an invoice
     *
     * @return invoiceCreator Address who created the invoice
     * @return tokenAddress Address of the token which token is to be transferred
     * @return tokenAmountInWei Number of tokens to be paid in smallest decimal of the token
     * @return receiver Address who should be paying for the invoice
     * @return isPaidBy Who paid for the stream, 0x00 if unpaid.
     * @return isCancelled If the stream is cancelled.
     */
    function getInvoice(
        uint invoiceID
        ) external view returns (
            address invoiceCreator,
            address tokenAddress,
            uint tokenAmountInWei,      
            address payable receiver,
            address isPaidBy,
            bool isCancelled
        ){
            return (invoices[invoiceID]._invoiceCreator, invoices[invoiceID]._tokenAddress, invoices[invoiceID]._tokenAmountInWei, invoices[invoiceID]._receiver, invoices[invoiceID]._isPaidBy, invoices[invoiceID]._isCancelled );
    }


    /**
     * @dev When invoice creator creates the invoice for themselves.
     *
     * @param tokenAddress Address of the token which token is to be transferred
     * @param tokenAmountInWei Number of tokens to be paid in smallest decimal of the token
     *
     * @return invoiceID the invoice ID
     */
    function createInvoice(
        address tokenAddress, 
        uint tokenAmountInWei
        ) external whenNotPaused returns (uint invoiceID) {
            return createInvoice(tokenAddress,tokenAmountInWei,_msgSender());
    }

    /**
     * @dev When invoice creator creates the invoice for Someoneelse.
     *
     * @param tokenAddress Address of the token which token is to be transferred
     * @param tokenAmountInWei Number of tokens to be paid in smallest decimal of the token
     * @param receiver the receiver who will receive the tokens
     * 
     * @return invoiceID the invoice ID
     */
    function createInvoice(
        address tokenAddress, 
        uint tokenAmountInWei,
        address receiver
        ) public whenNotPaused returns (uint invoiceID) {
            require(tokenAmountInWei > 0, "Token amount has to be greated than zero");
            require(tokenAddress != address(0), "Token address cannot be zero");
            require(invoices[_invoiceID]._invoiceCreator == address(0), "Invoice ID already used");

               uint currentInvoiceID = _invoiceID;
             _invoiceID = _invoiceID + 1;

            invoices[currentInvoiceID]._invoiceCreator        = _msgSender();
            invoices[currentInvoiceID]._tokenAddress          = tokenAddress;
            invoices[currentInvoiceID]._tokenAmountInWei      = tokenAmountInWei;
            invoices[currentInvoiceID]._receiver              = payable(receiver);
            invoices[currentInvoiceID]._isCancelled           = false;

         

            emit InvoiceCreated(
                currentInvoiceID,
                invoices[currentInvoiceID]._invoiceCreator, 
                invoices[currentInvoiceID]._tokenAddress,
                invoices[currentInvoiceID]._tokenAmountInWei,
                invoices[currentInvoiceID]._receiver
                );
          
            return currentInvoiceID;

    }

    /**
     * @dev Function to check if the invoice can be cancelled
     *
     * @param invoiceID the invoice ID
     * 
     * @return boolean value if the invoice can be cancelled by the caller
     */
    function canCancelInvoice(
        uint invoiceID
        ) public view returns (bool) {
            require(invoiceID > 0, "Invoice ID should be more than zero");
            require(! invoices[invoiceID]._isCancelled, "Invoice already cancelled");
            require(invoices[invoiceID]._isPaidBy == address(0), "Cannot cancel a paid invoice");
            require(invoices[invoiceID]._invoiceCreator == _msgSender(), "Invoice can only be cancelled by creater");

            return true;
    }

    /**
     * @dev Function to check if the invoice can be cancelled
     *
     * @param invoiceID the invoice ID
     * 
     * @return boolean value if the invoice is cancelled
     */
    function cancelInvoice(uint invoiceID) external returns (bool){
        require(canCancelInvoice(invoiceID));
        invoices[invoiceID]._isCancelled = true;
        
        // Emit event
        emit InvoiceCancelled(invoiceID);
        
        return true;
    }

    /**
     * @dev Function to check if the invoice is payable
     *
     * @param invoiceID the invoice ID
     * 
     * @return boolean value if the invoice can be paid
     */
    function canIPayTheInvoice(
            uint invoiceID
        ) public view returns (bool) {

            require(invoiceID > 0, "Invoice ID should be more than zero");

            // Check if this contract has allowance to transfer tokens on behalf of Invoice payer
            require(IERC20(invoices[invoiceID]._tokenAddress).allowance(_msgSender(),address(this)) >= invoices[invoiceID]._tokenAmountInWei, "Token approval amount not enough");

            //Check if the invoice is not cancelled
            require(! invoices[invoiceID]._isCancelled, "Invoice already cancelled");

            //Check if the invoice is not paid already
            require(invoices[invoiceID]._isPaidBy == address(0), "Invoice paid already");

            return true;
    }


    /**
     * @dev Function to pay the invoice
     *
     * @param invoiceID the invoice ID
     * 
     * @return boolean value if the invoice got paid
     */
    function payInvoice(
            uint invoiceID
        ) external returns (bool){
            require(canIPayTheInvoice(invoiceID), "You cannot pay for the invoice");
            
            // Transfer token from Invoice payer to receiver
            require (IERC20(invoices[invoiceID]._tokenAddress).transferFrom(_msgSender(), invoices[invoiceID]._receiver, invoices[invoiceID]._tokenAmountInWei));
            invoices[invoiceID]._isPaidBy = _msgSender();

            // Emit event
            emit InvoicePaid(invoiceID, _msgSender(), (invoices[invoiceID]._receiver == _msgSender()));

            return true;
    }

}
