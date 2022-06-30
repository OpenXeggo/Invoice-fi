import { NavLink } from "react-router-dom";
import XeggoLogo from '../assets/Xeggo.png';
import DashboardIcon from "../assets/dashboard.png";
import LetterIcon from "../assets/letter.png"
import { modifyAddress } from "../utils/modifyAddress";

const Navbar = ({account}) => {

    return ( 
        <div className="navbar">
            <div className="navbar-container">
                <div className="logo-container pointer" onClick={e=>window.location.reload()}>
                    <span className="logo"><img src={XeggoLogo} alt="Xeggo Logo" /></span>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;