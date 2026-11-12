import { userInfo } from "../states/zustandStates"


const API_URL = import.meta.env.VITE_API_URL;//backend url

async function signupRequest(event:any, navigate:any) {

    event.preventDefault(); //preventing default browser actions.
    const {firstName, lastName, email, password, updatePassword, updateAccessToken, updateEmail,updateFirstName, updateLastName, updateId, updateStorageLimit, updateStorageUsed, updateCreatedAt} = userInfo.getState();
    try {
        //sending request to backend
        const response = await fetch(
            `${API_URL}/authorization/signup`,
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
        updateId(data.user.id);
        updateAccessToken(data.accessToken);
        updateEmail(data.user.email);
        updateFirstName(data.user.firstName);
        updateLastName(data.user.lastName);
        updateStorageLimit(data.user.sotrageLimit);
        updateStorageUsed(data.user.storageUsed);
        updateCreatedAt(data.user.createdAt);
        navigate("/dashboard");//navigating user to dashboard
    } catch (error) {
        console.error(error);
    }
}

export default signupRequest;