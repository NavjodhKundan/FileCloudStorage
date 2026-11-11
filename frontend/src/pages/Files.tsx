import { NavigationBar } from "../layouts/NavigationBar"
import { BodyHeader } from "../layouts/BodyHeader"
import { FileUpload } from "../layouts/FileUpload"
import { FileLayout } from "../layouts/FilesLayout"
import { useState } from "react"

export const Files = () => {

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="fullBody">
            <NavigationBar/>
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