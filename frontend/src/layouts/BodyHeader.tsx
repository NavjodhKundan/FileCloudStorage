import defaultImage from "../assets/defaultImage.png"
import { userInfo } from "../states/zustandStates"

export const SearchBar = () => {

    const {firstName} = userInfo.getState();
    const {lastName} = userInfo.getState();
    console.log(userInfo.getState())

    return (
        <div className="bodyHeader">
            <input type="text" placeholder="🔍︎ search..." id="searchBar"></input>
            <img src={defaultImage} alt="user image"></img>
            <p>{`${firstName} ${lastName}`}</p>
        </div>
    )
}