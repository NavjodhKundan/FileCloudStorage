import { userInfo } from "../states/zustandStates";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function loginRequest(event:any, navigate:any) {

    event.preventDefault(); //preventing default browser actions.

    const {email, password, updatePassword, updateAccessToken, updateFirstName, updateLastName, updateEmail, updateId} = userInfo.getState();

    try {
        //sending request to backend
        const response = await fetch(
            `${API_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",//sending in json formate
                },
                body: JSON.stringify({ email: email, password: password }),
            }
        )

        const data = await response.json().catch(()=>({}));//getting response from backend
        if (!response.ok) {
            throw new Error(data.message || "login failed");//theroing error if not successful
        }
        updatePassword("");//clearing password from global state
        updateId(data.user.id);
        updateAccessToken(data.user.accessToken);
        updateEmail(data.user.email);
        updateFirstName(data.user.firstName);
        updateLastName(data.user.lastName);
        navigate("/dashboard");//navigating user to dashboard
    } catch (error) {
        console.error(error);
    }

}