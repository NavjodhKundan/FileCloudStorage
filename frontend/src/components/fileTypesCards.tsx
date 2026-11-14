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

    const [files, setFiles] = useState<FileInfo[]>([]);
    const [typeCount, setTypeCount] = useState({
        pdf: 0,
        documnet: 0,
        excel: 0,
        powerPoint: 0,
        images: 0,
        text: 0,
        zip: 0,
        others: 0
    });

    useEffect(() => {
        async function loadFiles() {
            const data = await getAllFiles();
            setFiles(data);
        }
        loadFiles();
    }, []);

    const pdfCount = files.filter(file =>
        formatFileType(file.fileType) === "pdf"
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
                <p id="number">{files.length}</p>
            </div>

            <div className="displayCard">
                <p id="text">PDF Files</p>
                <p id="number">{pdfCount}</p>
            </div>

            <div className="displayCard">
                <p id="text">Documnets files</p>
                <p id="number">{docCount}</p>
            </div>

            <div className="displayCard">
                <p id="text">Excel Files</p>
                <p id="number">{exlCount}</p>
            </div>

            <div className="displayCard">
                <p id="text">PowerPoint Files</p>
                <p id="number">{ppCount}</p>
            </div>

            <div className="displayCard">
                <p id="text">Images</p>
                <p id="number">{imageCount}</p>
            </div>

            <div className="displayCard">
                <p id="text">Text Files</p>
                <p id="number">{textCount}</p>
            </div>

            <div className="displayCard">
                <p id="text">Zip Files</p>
                <p id="number">{zipCount}</p>
            </div>

            <div className="displayCard">
                <p id="text">Other Files</p>
                <p id="number">{otherCount}</p>
            </div>
        </div>
    )
}