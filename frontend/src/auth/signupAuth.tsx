import { userInfo } from "../states/zustandStates"


const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";//backend url

async function signupRequest(event:any, navigate:any) {

    event.preventDefault(); //preventing default browser actions.
    const {firstName, lastName, email, password, updatePassword, updateAccessToken, updateEmail,updateFirstName, updateLastName, updateId} = userInfo.getState();
    try {
        //sending request to backend
        const response = await fetch(
            `${API_URL}/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",//sending in json formate
                },
                body: JSON.stringify({ firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase(), email: email.toLowerCase(), password: password }),
            }
        )

        const data = await response.json().catch(()=>({}));//getting response from backend
        if (!response.ok) {
            throw new Error(data.message ?? "Registration failed");//theroing error if not successful
        }
        updatePassword("");//clearing password from global state
        updateId(data.id);
        updateAccessToken(data.accessToken);
        updateEmail(data.email);
        updateFirstName(data.firstName);
        updateLastName(data.updateLastName);
        navigate("/dashboard");//navigating user to dashboard
    } catch (error) {
        console.error(error);
    }
}

export default signupRequest;