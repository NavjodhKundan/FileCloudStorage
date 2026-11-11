import { NavigationBar } from "../layouts/NavigationBar"
import { UserImage } from "../layouts/BodyHeader"
import { UserName } from "../layouts/BodyHeader"
import { MainBody } from "../layouts/DashboardLayout"
import { FileUpload } from "../layouts/FileUpload"

export const Dashboard = () => {
    return (
        <div className="fullBody">
            <div className="leftSide">
                <NavigationBar />
            </div>
            <div className="rightSide">
                <div className="bodyHeader">
                    <span id="firstChild" style={{fontSize: '25px'}}><h1>Welcome to your dashboard!</h1></span>
                    <span id="secondChild"><UserImage /></span>
                    <span id="thirdChild"><UserName /></span>
                </div>
                <div className="mainBody">
                    <MainBody />
                    <FileUpload />
                </div>
            </div>
        </div>
    )
}