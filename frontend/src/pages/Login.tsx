import { Link } from "react-router-dom";
import { userInfo } from "../states/zustandStates";
import { loginRequest } from "../auth/loginAuth";
import { useNavigate } from "react-router-dom";
import companyLogo2 from "../assets/companyLogo2.png";

export const Login = () => {

    const navigate = useNavigate();

    const email = userInfo((state) => state.email);
    const updateEmail = userInfo((state) => state.updateEmail);

    const password = userInfo((state) => state.password);
    const updatePassword = userInfo((state) => state.updatePassword);

    return (
        <div className="authBody">
            <div className="authCard">
                <img src={companyLogo2} alt="company logo"></img>
                <h1>Login</h1>
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
                <p>Dont have an account? <Link id="link" to="/Signup">Sign up</Link></p>
            </div>
        </div>
    )
}