import { userInfo } from "../states/zustandStates";

export async function getAllFiles() {
    const API_URL = import.meta.env.VITE_API_URL;
    const { accessToken } = userInfo.getState();
    try {
        const response = await fetch(
            `${API_URL}/files/getAllFiles`,
            {
                method: "GET",
                headers: { authorization: `Bearer ${accessToken}` }
            }
        );
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch files.");
        }

        return data;
    } catch (error) {
        console.log("something went wrong: ", error);
        return [];
    }
}

export function formatFileSize(size: number): string {
    if (size < 1024) {
        return `${size} Bytes`;
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

export async function deleteFile(fileId: number){
    const { accessToken, updateStorageUsed } = userInfo.getState();
    const API_URL = import.meta.env.VITE_API_URL;
    try{
        const response = await fetch(
            `${API_URL}/files/deleteFile`,
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

//function for user to request to download files
export async function downloadFile(fileId:number, fileName:string) {
    const { accessToken } = userInfo.getState();//getting user access token
    const API_URL = import.meta.env.VITE_API_URL;
    try{
        //sending request to backend
        const response = await fetch(
            `${API_URL}/files/downloadFile/${fileId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        )

        //checking for healthy response
        if(!response.ok){
            console.log("error from backend");
            return;
        }

        //converting response to blob
        const blob = await response.blob();
        // Create a temporary download URL
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();

        // Clean up
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.log(error);
    }
}