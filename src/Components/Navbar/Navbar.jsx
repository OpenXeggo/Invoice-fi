import XeggoLogo from '../../assets/Xeggo.png';
import BellIcon from "../../assets/bell.svg"
import ProfileIcon from "../../assets/profile.svg"
import MoonIcon from "../../assets/icons/MoonIcon";
import SunIcon from "../../assets/icons/SunIcon";

import SearchIcon from "../../assets/search.svg";
import "./navbar.css";

const Navbar = ({account}) => {

    return ( 
        <div className="navbar">
            <div className="navbar-container">
                <div className="logo-container pointer" onClick={e=>window.location.reload()}>
                    <span className="logo"><img src={XeggoLogo} alt="Xeggo Logo" /></span>
                </div>
                <div className="header-container">
                    <div className="search-container">
                        <img src={SearchIcon} alt="" />
                        <input type="input" className="search-bar" placeholder="Search Invoice"/>
                    </div>
                    <div className="header-end">
                        <div className="flex"><img src={BellIcon} /></div>
                            <span className="separator">|</span>
                        <div className="flex gap-10">
                            <img src={ProfileIcon} />
                            <div className="profile flex flex-col justify-center">
                                <b>Xeggo</b>
                                <span>03x...1919</span>
                            </div>
                        </div>
                        <span className="separator">|</span>
                        <div className="switch">
                            <div className="active">
                                <SunIcon />
                            </div>
                            <div className="">
                                <MoonIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;