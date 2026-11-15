import fileUploadImage from "../assets/uploadFile.png";
import { useState, useRef } from "react";
import { userInfo } from "../states/zustandStates";
import { StorageCard } from "../components/storageCard";

export const FileUpload = () => {

    const [loading, setLoading] = useState(false);
    const [ error, setError ] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const selectFile = () => {
        fileInputRef.current?.click();
    }

    const fileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

        setLoading(true);

        const selectedFile = event.target.files?.[0];

        if(!selectedFile){
            setError("No files selected.");
            return;
        }

        const { accessToken, updateStorageUsed } = userInfo.getState();
        const formData = new FormData();
        formData.append("file", selectedFile);
        const API_URL = import.meta.env.VITE_API_URL;

        try{
            const response = await fetch(
                `${API_URL}/files/uploadFile`, {
                    method: "POST",
                    headers: { authorization: `Bearer ${accessToken}`},
                    body: formData
                });
            const result = await response.json();
            if(!response.ok){
                setError("unable to upload file");
                return;
            }
            updateStorageUsed(result.storageUsed);
            alert("File uploaded successfully!");
        } catch {
            setError("unable to upload file");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fileUpload">
            <div className="uploadCard">
                <img src={fileUploadImage} alt="file-upload image"></img>
                <h2>Store your file safely</h2>
                <p>Click upload button and select your file. Once slected file will be uploaded.</p>
                <input type="file" ref={fileInputRef} onChange={fileUpload} style={{display: "none"}}></input>
                {loading ? <button>Uploading...</button> : <button onClick={selectFile} id="uploadBtn">Upload Files</button>}
                <br></br>
                {error ? <p style={{color: "red"}}>{error}</p> : ""}
            </div>

            <div className="storageCard">
                <StorageCard/>
            </div>
        </div>
    )
}