import { formatFileSize } from "./fileServices";
import { formatDate } from "./fileServices";
import { formatFileType } from "./fileServices";
import { downloadFile } from "./fileServices";
import { deleteFile } from "./fileServices";

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
                <span><button onClick={() => downloadFile(props.fileId, props.name)} title="download file">⬇️</button></span>
                <span><button onClick={() => deleteFile(props.fileId)} title="delete file">❌</button></span>
            </li>
        </div>
    )
}