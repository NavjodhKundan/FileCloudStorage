import defaultImage from "../assets/defaultImage.png"
import { userInfo } from "../states/zustandStates"

export const SearchBar = () => {
    return (
        <div className="searchBar">
            <input type="text" placeholder="🔍︎ search..." id="searchBar"></input>
        </div>
    )
}

export const UserImage = () => {
    return (
        <div className="userImgage">
            <img src={defaultImage} alt="user image"></img>
        </div>
    )
}

export const UserName = () => {
    const {firstName, lastName} = userInfo.getState();
    return (
        <div className="userName">
            <p style={{textTransform: 'capitalize'}}>{`${firstName} ${lastName}`}</p>
        </div>
    )
}

export const BodyHeader = () => {

    return (
        <div className="bodyHeader">
            <span id="firstChild" style={{marginTop:"30px"}}><SearchBar/></span>
            <span id="secondChild"><UserImage/></span>
            <span id="thirdChild"><UserName/></span>
        </div>
    )
}