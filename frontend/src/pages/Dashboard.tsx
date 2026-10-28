import { NavigationBar } from "../layouts/NavigationBar"
import { SearchBar } from "../layouts/BodyHeader"
import { MainBody } from "../layouts/MainBody"
import { FileUpload } from "../layouts/FileUpload"

export const Dashboard = () =>{
    return (
        <div className="dashboard">
            <NavigationBar/>
            <div className="rightSide">
                <SearchBar/>
                <div className="dashBody">
                    <MainBody/>
                    <FileUpload/>
                </div>
            </div>
        </div>
    )
}