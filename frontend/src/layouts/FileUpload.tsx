import fileUploadImage from "../assets/uploadFile.png";
import { useRef } from "react";
import { userInfo } from "../states/zustandStates";
import { StorageCard } from "../components/storageCard";

export const FileUpload = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const selectFile = () => {
        fileInputRef.current?.click();
    }

    const fileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const selectedFile = event.target.files?.[0];

        if(!selectedFile){
            console.log("no file selected!");
            return;
        }

        const { accessToken } = userInfo.getState();
        const formData = new FormData();
        formData.append("file", selectedFile);
        const API_URL = import.meta.env.VITE_API_URL;
        try{
            
            const response = await fetch(
                `${API_URL}/fileUplaodRouter/fileUploadController`, {
                    method: "POST",
                    headers: { authorization: `Bearer ${accessToken}`},
                    body: formData
                });
            const result = await response.json();
            console.log(result.message);
            if(!response.ok){
                throw new Error(result.message);
            }
            alert("File uploaded successfully!");
        } catch {
            console.error("uploading failed");
        }
    }

    return (
        <div className="fileUpload">
            <div className="uploadCard">
                <img src={fileUploadImage} alt="file-upload image"></img>
                <h2>Store your file safely</h2>
                <p>Click upload button and select your file. Once slected file will be uploaded.</p>
                <input type="file" ref={fileInputRef} onChange={fileUpload} style={{display: "none"}}></input>
                <button onClick={selectFile}>Upload Files</button>
            </div>

            <div className="storageCard">
                <StorageCard/>
            </div>
        </div>
    )
}