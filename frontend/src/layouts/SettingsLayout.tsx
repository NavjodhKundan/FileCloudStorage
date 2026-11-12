import { UserInfoCard } from "../components/userInfoCard"
import { DeleteAccount } from "../components/deleteAccount"


export const SettingsLayout = () => {
    return(
        <div className="middleBody">
            <UserInfoCard/>
            <DeleteAccount/>
        </div>
    )
}