import { supabase } from "../config/supabaseClient.js";

export const fileUpload = async (req, res) => {
    try {
        const file = req.file;

        if (!req.file) {
            return res.status(400).json({ message: "no file uploaded." });
        }

        const fileInfo = {
            userId: req.user.id,
            originalName: file.originalname,
            storedName: file.filename,
            fileType: file.mimetype,
            filePath: file.path,
            fileSize: file.size
        }

        const { error: metaDataError } = await supabase.from("files").insert({ 
            owner: fileInfo.userId,
            file_original_name: fileInfo.originalName,
            file_created_name: fileInfo.storedName,
            file_path: fileInfo.filePath,
            file_size: fileInfo.fileSize,
            file_type: fileInfo.fileType
        });

        if(metaDataError){
            console.log(metaDataError);
            return res.status(500).json({ message: "database connection error from files table." });
        }

        const storageUsed = fileInfo.fileSize + req.storageInfo.storageAval;
        const { data:storageData, error:storageError} = await supabase.from("users").update({ storage_used:storageUsed }).eq('id', userId);
        if(!storageData){
            return res.status(401).json({ message: "Not able to update storage." });
        }
        if(storageError){
            return res.status(500).json({ message: "database connection error from users table." });
        }

        return res.status(200).json({ message: "File uploaded successfully!" })
    } catch (error) {
        return res.status(500).json({
            message: "server error, uploading failed...",
            errors: error.issues
        })
    }
}