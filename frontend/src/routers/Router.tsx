import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";

//created routes for changing pages whithin the application
const router = createBrowserRouter([
    { path: "/login", Component: Login }, //path for login page
    { path: "/signup", Component: Signup }, //path for signup page
    { path: "/dashboard", Component: Dashboard}, //path for dashborad page
])

export default router;