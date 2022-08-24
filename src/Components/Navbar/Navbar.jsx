import XeggoLogo from '../../assets/Xeggo.png';
import BellIcon from "../../assets/bell.svg"
import ProfileIcon from "../../assets/profile.svg"
import MoonIcon from "../../assets/icons/MoonIcon";
import SunIcon from "../../assets/icons/SunIcon";

import SearchIcon from "../../assets/search.svg";
import "./navbar.css";
import { modifyAddress } from '../../utils/modifyAddress';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = ({account}) => {

    const { username } = useSelector(state=>state.user.userData);
    const { theme } = useSelector(state=> state.ui)

    const dispatch = useDispatch();

    const handleThemeChange = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        dispatch({type:"CHANGE_USER_THEME", payload: newTheme}) 
    }

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
                            <span className="navbar-gap">|</span>
                        <div className="flex gap-10">
                            <img src={ProfileIcon} />
                            <div className="profile flex flex-col justify-center">
                                <b>{ username }</b>
                                <span>{modifyAddress(account)}</span>
                            </div>
                        </div>
                        <span className="navbar-gap">|</span>
                        <div className="switch pointer" onClick={handleThemeChange}>
                            <>
                                <div className={theme === "light" ? "active" : ""}>
                                    <SunIcon />
                                </div>
                                <div className={theme === "dark" ? "active" : ""}>
                                    <MoonIcon />
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;