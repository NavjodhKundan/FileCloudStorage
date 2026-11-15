import { getAllFiles } from "./fileServices"
import { formatFileType } from "./fileServices";
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

    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState<FileInfo[]>([]);

    useEffect(() => {
        async function loadFiles() {
            try {
                const data = await getAllFiles();
                setFiles(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        loadFiles();
    }, []);

    const pdfCount = files.filter(file =>
        formatFileType(file.fileType) === "PDF"
    ).length;

    const docCount = files.filter(file =>
        formatFileType(file.fileType) === "Word Document"
    ).length;

    const exlCount = files.filter(file =>
        formatFileType(file.fileType) === "Excel Spreadsheet"
    ).length;

    const ppCount = files.filter(file =>
        formatFileType(file.fileType) === "PowerPoint Presentation"
    ).length;

    const imageCount = files.filter(file =>
        formatFileType(file.fileType) === "GIF Image" || formatFileType(file.fileType) === "PNG Image" || formatFileType(file.fileType) === "JPEG Image"
    ).length;

    const textCount = files.filter(file =>
        formatFileType(file.fileType) === "Text Document"
    ).length;

    const zipCount = files.filter(file =>
        formatFileType(file.fileType) === "ZIP Archive"
    ).length;

    const otherCount = files.filter(file =>
        formatFileType(file.fileType) === "unknown"
    ).length;

    return (
        <div className="typeCards">
            <div className="displayCard">
                <p id="text">Total number of files</p>
                {loading ? <p>Loading...</p> : <p id="number">{files.length}</p>}
            </div>

            <div className="displayCard">
                <p id="text">PDF Files</p>
                {loading ? <p>Loading...</p> : <p id="number">{pdfCount}</p>}
            </div>

            <div className="displayCard">
                <p id="text">Documnets files</p>
                {loading ? <p>Loading...</p> : <p id="number">{docCount}</p>}
            </div>

            <div className="displayCard">
                <p id="text">Excel Files</p>
                {loading ? <p>Loading...</p> : <p id="number">{exlCount}</p>}
            </div>

            <div className="displayCard">
                <p id="text">PowerPoint Files</p>
                {loading ? <p>Loading...</p> : <p id="number">{ppCount}</p>}
            </div>

            <div className="displayCard">
                <p id="text">Images</p>
                {loading ? <p>Loading...</p> : <p id="number">{imageCount}</p>}
            </div>

            <div className="displayCard">
                <p id="text">Text Files</p>
                {loading ? <p>Loading...</p> : <p id="number">{textCount}</p>}
            </div>

            <div className="displayCard">
                <p id="text">Zip Files</p>
                {loading ? <p>Loading...</p> : <p id="number">{zipCount}</p>}
            </div>

            <div className="displayCard">
                <p id="text">Other Files</p>
                {loading ? <p>Loading...</p> : <p id="number">{otherCount}</p>}
            </div>
        </div>
    )
}