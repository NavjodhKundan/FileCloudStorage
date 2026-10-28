import companyLogo from "../assets/companyLogo.png"
import { NavLink } from "react-router-dom"
import { logout } from "../pages/Logout"
import { useNavigate } from "react-router-dom"

export const NavigationBar = () => {

    const navigate = useNavigate();
    const handelLogout = () => {
        logout();
        navigate("/login", {replace: true});
    }

    return (
        <div className="navbar">
            <div className="comLogo">
                <img src={companyLogo} alt="company logo"></img>
            </div>
            <nav>
                <NavLink to="/dashboard" id="navlist">🏠︎ Dashboard</NavLink>
                <NavLink to="/" id="navlist">📄 Files</NavLink>
                <NavLink to="/" id="navlist" >⚙️ Settings</NavLink>
                <button onClick={handelLogout}>➜] Logout</button>
            </nav>
        </div>
    )
}