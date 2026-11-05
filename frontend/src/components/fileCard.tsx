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

type fileInfo = {
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
                <span><button title="delete file">❌</button></span>
            </li>
        </div>
    )
}