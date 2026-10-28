import { Link } from "react-router-dom";
import { userInfo } from "../states/zustandStates";
import { loginRequest } from "../auth/loginAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    const email = userInfo((state) => state.email);
    const updateEmail = userInfo((state) => state.updateEmail);

    const password = userInfo((state) => state.password);
    const updatePassword = userInfo((state) => state.updatePassword);

    return (
        <div>
            <form onSubmit={(event) => loginRequest(event, navigate)}>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Email Id"
                    value={email}
                    onChange={(event) => updateEmail(event.currentTarget.value)}
                    required 
                /> <br />

                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(event) => updatePassword(event.currentTarget.value)}
                    required 
                /> <br />

                <button type="submit">Log in</button> <br />
            </form>
            <Link to="/Signup">Dont have an account? Sign up</Link>
        </div>
    )
}