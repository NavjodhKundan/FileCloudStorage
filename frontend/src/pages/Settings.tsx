import { NavigationBar } from "../layouts/NavigationBar"
import { UserImage } from "../layouts/BodyHeader"
import { UserName } from "../layouts/BodyHeader"
import { FileUpload } from "../layouts/FileUpload"
import { SettingsLayout } from "../layouts/SettingsLayout"

export const Settings = () => {
    return (
        <div className="fullBody">
            <NavigationBar />
            <div className="rightSide">
                <div className="bodyHeader">
                    <span id="firstChild" style={{fontSize: '25px'}}><h1>Settings</h1></span>
                    <span id="secondChild"><UserImage /></span>
                    <span id="thirdChild"><UserName /></span>
                </div>
                <div className="mainBody">
                    <SettingsLayout />
                    <FileUpload />
                </div>
            </div>
        </div>
    )
}