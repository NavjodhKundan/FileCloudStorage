import { userInfo } from "../states/zustandStates"
import { useNavigate } from "react-router-dom";

export const DeleteAccount = () => {

    const navigate = useNavigate();
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

            const data = await response.json();
            if (!response.ok) {
                console.log(data.message);
            }
            
            clearAll();
            
            alert("Account deleted successfully!");
            
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="deleteAcc">
            <p>Delete your account</p>
            <button onClick={() => deleteAccount()} >Delete Account</button>
        </div>
    )
}