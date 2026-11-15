import { logout } from "../pages/Logout"
import { useNavigate, useLocation } from "react-router-dom"

export const NavigationDropDown = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        logout();
        navigate("/login", {replace: true});
    }
    const handleNavigation = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue === "logout") {
            handleLogout();
        } else {
            navigate(selectedValue);
        }
    };

    return (
        <div className="navDrop">
            
            <select onChange={handleNavigation} value={location.pathname} id="navDrop">
                <option value={"/dashboard"}>🏠︎ Dashboard</option>
                <option value={"/files"}>📄 Files</option>
                <option value={"/settings"}>⚙️ Settings</option>
                <option value={"logout"}>➜] Logout</option>
            </select>
        </div>
    )
}