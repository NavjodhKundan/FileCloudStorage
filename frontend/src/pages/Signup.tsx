import { Link } from "react-router-dom";
import { userInfo } from '../states/zustandStates'
import signupRequest from "../auth/signupAuth";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();

    const fName = userInfo((state) => state.firstName);
    const updateFirstName = userInfo((state) => state.updateFirstName);

    const lName = userInfo((state) => state.lastName);
    const updateLastName = userInfo((state) => state.updateLastName);

    const email = userInfo((state) => state.email);
    const updateEmail = userInfo((state) => state.updateEmail);

    const password = userInfo((state) => state.password);
    const updatePassword = userInfo((state) => state.updatePassword);

    return (
        <div>
            <form onSubmit={(event) => signupRequest(event, navigate)}>
                <input 
                    type="text" 
                    name="fName" 
                    id="fName" 
                    placeholder="First Name" 
                    value={fName}
                    onChange={(event) => updateFirstName(event.currentTarget.value)}
                    required
                /> <br/>

                <input 
                    type="text" 
                    name="lName" 
                    id="lName" 
                    placeholder="Last Name" 
                    value={lName}
                    onChange={(event) => updateLastName(event.currentTarget.value)}
                    required
                /> <br/>
                
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Email Id" 
                    value={email}
                    onChange={(event) => updateEmail(event.currentTarget.value)}
                    required
                /> <br/>

                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(event) => updatePassword(event.currentTarget.value)}
                    required
                /> <br />

                <button type="submit">Sign Up</button> <br/>
            </form>

            <Link to="/Login">Already have an account? Login</Link>
        </div>
    )
}