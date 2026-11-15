import { userInfo } from "../states/zustandStates"
import { useNavigate } from "react-router-dom";

export async function checkUserSession() {
    const navigate = useNavigate();
    const { accessToken } = userInfo.getState();
    const API_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(
            `${API_URL}/authorization/checkUserSession`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        });
        const message = await response.json();
        if(!response.ok){
            navigate("/login");
        }
        if(message === "unauthorized") return navigate("/login");
    } catch (error) {
        console.log("error");
    }
}