import { UserInfoCard } from "../components/userInfoCard"
import { DeleteAccount } from "../components/deleteAccount"
import { StorageInfo } from "../components/storageCard"


export const SettingsLayout = () => {
    return(
        <div className="middleBody">
            <UserInfoCard/>
            <StorageInfo/>
            <DeleteAccount/>
        </div>
    )
}