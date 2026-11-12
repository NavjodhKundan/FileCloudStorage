import { userInfo } from "../states/zustandStates"
import { formatDate } from "./fileCard";

export const UserInfoCard = () => {

    const {firstName, lastName, createdAt, email} = userInfo.getState();
    const fullName = `${firstName} ${lastName}`;
    const date = formatDate(createdAt);
    return (
        <div className="userInfoCard">
            <p>Name</p> 
            <input type="text" value={fullName} readOnly></input>

            <p>Email</p>
            <input type="email" value={email} readOnly></input>

            <p>Date Created</p>
            <input type="text" value={date} readOnly></input>
        </div>
    )
}