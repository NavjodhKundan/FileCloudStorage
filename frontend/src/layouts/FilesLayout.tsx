import { FileCard } from "../components/fileCard"
import { userInfo } from "../states/zustandStates";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const { accessToken } = userInfo.getState();

export const FileLayout = ({searchQuery}: any) => {

    type FileInfo = {
        fileId: string,
        originalName: string,
        storedName: string,
        fileType: string,
        fileSize: number,
        createdAt: string,
    }

    const [files, setFiles] = useState<FileInfo[]>([]);
    async function getAllFiles() {
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

    useEffect(() => {
        async function loadFiles() {
            const data = await getAllFiles();
            setFiles(data);
        }
        loadFiles();
    }, []);

    const filteredFiles = files.filter((file) => {
            if ( file.originalName.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
            file.fileType.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ) {
                return (
                    <FileCard
                        key={file.fileId}
                        fileId={Number(file.fileId)}
                        name={file.originalName}
                        size={file.fileSize}
                        type={file.fileType}
                        createdAt={file.createdAt}
                    />
                )
            }
    })

    return (
        <div className="middleBody">
            {
                files.length > 0 ? (
                    filteredFiles.length > 0 ? (
                        filteredFiles.map((file) => (
                            <FileCard
                                key={file.fileId}
                                fileId={Number(file.fileId)}
                                name={file.originalName}
                                size={file.fileSize}
                                type={file.fileType}
                                createdAt={file.createdAt}
                            />
                        ))
                    ) : ( <p>no files found.</p> )
                ) : (<p>no files to display.</p>)
            }
        </div>
    )
}