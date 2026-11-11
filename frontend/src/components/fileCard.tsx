import { userInfo } from "../states/zustandStates";

export function formatFileSize(size: number): string {
    if (size < 1024) {
        return `${size} bytes`;
    } else if (size < 1024 * 1024) {
        return `${Math.round(size / 1024)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
        return `${Math.round(size / (1024 * 1024))} MB`;
    } else if (size < 1024 * 1024 * 1024 * 1024) {
        return `${Math.round(size / (1024 * 1024 * 1024))} GB`;
    } else {
        return "unable to display file size";
    }
}

export function formatDate(date: string): string{
    return new Date(date).toLocaleDateString("en-CA", {year: "numeric", month: "short", day: "numeric"});
}

export function formatFileType(fileType: string): string{
    const types: Record<string, string> = {
        "application/pdf": "PDF",
        "application/msword": "Word Document",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Word Document",
        "application/vnd.ms-excel": "Excel Spreadsheet",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Excel Spreadsheet",
        "application/vnd.ms-powerpoint": "PowerPoint Presentation",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": "PowerPoint Presentation",
        "image/png": "PNG Image",
        "image/jpeg": "JPEG Image",
        "image/gif": "GIF Image",
        "text/plain": "Text Document",
        "application/zip": "ZIP Archive"
    };

    return types[fileType] || "unknown";
}

async function deleteFile(fileId: number){
    const { accessToken, updateStorageUsed } = userInfo.getState();
    const API_URL = import.meta.env.VITE_API_URL;
    try{
        const response = await fetch(
            `${API_URL}/deleteFileRouter/deleteFileController`,
            {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}` 
                },
                body: JSON.stringify({ fileId: fileId})
            }
        )

        const data = await response.json();

        if(!response.ok){
            console.log("error from backend");
            console.log(data.message);
            return;
        }

        updateStorageUsed(data.storageUsed);
        alert("File deleted successfully!");
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

type fileInfo = {
    fileId: number,
    name: string,
    size: number,
    type: string,
    createdAt: string,
}

export const FileCard = (props: fileInfo) => {
    return (
        <div className="fileCard">
            <li>
                <span>{props.name}</span>
                <span>{formatFileSize(props.size)}</span>
                <span>{formatFileType(props.type)}</span>
                <span>{formatDate(props.createdAt)}</span>
                <span><button title="download file">⬇️</button></span>
                <span><button onClick={() => deleteFile(props.fileId)} title="delete file">❌</button></span>
            </li>
        </div>
    )
}