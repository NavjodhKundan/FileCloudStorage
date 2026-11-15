import { NavigationBar } from "../layouts/NavigationBar"
import { BodyHeader } from "../layouts/BodyHeader"
import { FileUpload } from "../layouts/FileUpload"
import { FileLayout } from "../layouts/FilesLayout"
import { useState } from "react"
import { checkUserSession } from "../auth/UserSession"
import { NavigationDropDown } from "../layouts/navBarDropDown"

export const Files = () => {

    checkUserSession();

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="fullBody">
            <div className="leftSide">
                <NavigationDropDown/>
                <NavigationBar />
            </div>
            <div className="rightSide">
                <BodyHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <div className="mainBody">
                    <FileLayout searchQuery={searchQuery}/>
                    <FileUpload/>
                </div>
            </div>
        </div>
    )
}