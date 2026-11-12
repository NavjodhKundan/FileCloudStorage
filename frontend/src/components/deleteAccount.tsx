import { userInfo } from "../states/zustandStates"
import { useNavigate } from "react-router-dom";

async function deleteAccount() {
    try {
        const { accessToken, clearAll } = userInfo.getState();//getting user id
        const API_URL = import.meta.env.VITE_API_URL;//saving api url

        const response = await fetch(
            `${API_URL}/authorization/deleteAccount`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        )

        if(!response.ok){
            console.log("error from backend");
            return;
        }

        clearAll();
        alert("Account deleted successfully!");
        const navigate = useNavigate();
        navigate("/login");
    } catch (error) {
        console.log(error);
    }
}


export const DeleteAccount = () => {
    return (
        <div className="deleteAcc">
            <p>Delete your account</p>
            <button onClick={() => deleteAccount()} >Delete Account</button>
        </div>
    )
}