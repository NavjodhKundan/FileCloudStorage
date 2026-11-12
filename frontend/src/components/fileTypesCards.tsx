import { getAllFiles } from "./fileServices"
import { useEffect, useState } from "react";

export const TotalFiles = () => {
    type FileInfo = {
        fileId: string,
        originalName: string,
        storedName: string,
        fileType: string,
        fileSize: number,
        createdAt: string,
    }

    const [files, setFiles] = useState<FileInfo[]>([]);

    useEffect(() => {
        async function loadFiles() {
            const data = await getAllFiles();
            setFiles(data);
        }
        loadFiles();
    }, []);

    return (
        <div className="typeCards">
            <p id="text">Total number of files</p>
            <p id="number">{files.length}</p>
        </div>
    )
}