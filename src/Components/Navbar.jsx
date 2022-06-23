import { NavLink } from "react-router-dom";
import XeggoLogo from '../assets/Xeggo.png';
import DashboardIcon from "../assets/dashboard.png";
import LetterIcon from "../assets/letter.png"
import { modifyAddress } from "../utils/modifyAddress";

const Navbar = ({account}) => {

    return ( 
        <div className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <div className="logo-container pointer" onClick={e=>window.location.reload()}>
                        <span className="logo"><img src={XeggoLogo} alt="Xeggo Logo" /></span>
                    </div>
                    <NavLink to={'/'} className="nav-link">
                        <span className="nav-link-icon"><img src={DashboardIcon}/></span>
                        <span className="nav-link-text">Dashboard</span>
                    </NavLink>
                    <NavLink to={'/create'} className="nav-link">
                        <span className="nav-link-icon"><img src={LetterIcon}/></span>
                        <span className="nav-link-text">Invoices</span>
                    </NavLink>
                </div>
                <div className="navbar-right">
                    {account.length ? (
                        <button className="xeggo-button">{modifyAddress(account, 9)}</button>
                        
                    )
                    :(<button className="xeggo-button">Connect Wallet</button>)}
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;