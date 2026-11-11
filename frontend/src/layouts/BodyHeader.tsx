import defaultImage from "../assets/defaultImage.png"
import { userInfo } from "../states/zustandStates"

type SearchBarProps = {
        searchQuery: string;
        setSearchQuery: (value: string) => void;
    }
export const SearchBar = ({searchQuery, setSearchQuery}: SearchBarProps) => {

    return (
        <div className="searchBar">
            <input type="text" placeholder="🔍︎ search..." id="searchBar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
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

export const BodyHeader = ({searchQuery, setSearchQuery}: SearchBarProps) => {

    return (
        <div className="bodyHeader">
            <span id="firstChild" style={{marginTop:"30px"}}><SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/></span>
            <span id="secondChild"><UserImage/></span>
            <span id="thirdChild"><UserName/></span>
        </div>
    )
}