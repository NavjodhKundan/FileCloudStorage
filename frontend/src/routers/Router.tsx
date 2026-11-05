import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { Files } from "../pages/Files";
import { Settings } from "../pages/Settings";

//created routes for changing pages whithin the application
const router = createBrowserRouter([
    { path: "/login", Component: Login }, //path for login page
    { path: "/signup", Component: Signup }, //path for signup page
    { path: "/dashboard", Component: Dashboard }, //path for dashborad page
    { path: "/files", Component: Files }, //path to see all uploaded files
    { path: "/settings", Component: Settings }, //path to settings page
])

export default router;