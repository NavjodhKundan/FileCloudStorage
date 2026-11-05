import { NavigationBar } from "../layouts/NavigationBar"
import { BodyHeader } from "../layouts/BodyHeader"
import { FileUpload } from "../layouts/FileUpload"
import { FileLayout } from "../layouts/FilesLayout"

export const Files = () => {
    return (
        <div className="fullBody">
            <NavigationBar/>
            <div className="rightSide">
                <BodyHeader/>
                <div className="mainBody">
                    <FileLayout/>
                    <FileUpload/>
                </div>
            </div>
        </div>
    )
}