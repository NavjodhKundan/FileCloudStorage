import { supabase } from "../config/supabaseClient.js";
import fs from "fs/promises";
import path from "path";


export const getAllFiles = async (req, res) => {
    try{
        const userId = req.user.id;
        const {data, error} = await supabase.from("files").select().eq("owner", userId);
        if(!data){
            return res.status(404).json({ message: "no data found" });
        }
        if(error){
            return res.status(500).json({ message: "database connection error from files table." });
        }
        return res.status(200).json(
            data.map(file => ({ 
                fileId: file.id,
                originalName: file.file_original_name,
                storedName: file.file_created_name,
                fileType: file.file_type,
                fileSize: file.file_size,
                createdAt: file.created_at,
            }))
        );       
    } catch (error) {
        return res.status(500).json({
            message: "Error getting files.",
            errors: error.issues
        });
    }
}

export const deleteFile = async (req, res) => {
    try {
        //getting data from request body
        const userId = req.user.id;//saving user ID
        const { fileId } = req.body;//saving file ID 
        const STORAGE_PATH = process.env.FILE_PATH;
        //getting file metadata from database
        const { data:file, error:fileError } = await supabase.from("files").select().eq("id", fileId).eq("owner", userId).single();
        const { data:user, error:userError } = await supabase.from("users").select().eq("id", userId);

        if(fileError || !file || userError || !user){
            return res.status(404).json({ message: "File or user not found." });
        }

        const filePath = path.resolve(file.file_path);//saving file path

        //deleting file from cloud device
        try {
            await fs.unlink(filePath);
        } catch (error) {
            return res.status(404).json({ message: "File not found on storage." })
        }

        //deleting file metadata from database
        const {error:deleteError } = await supabase.from("files").delete().eq("id", fileId).eq("owner", userId);

        if(deleteError){
            return res.status(400).json({ message: "Metedata deletion error." });
        }

        const updatedStorage = user.storage_used - file.file_size;
        if(updatedStorage < 0){
            updatedStorage = 0;
        }

        const { data:storage, error:storageError } = await supabase.from("users").update({ storage_used: updatedStorage }).eq("id", userId).select("storage_used");
        if(storageError){
            return res.status(400).json({ message: "unable to update storage used." });
        }
        return res.status(200).json({ storageUsed: storage.storage_used })
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting file.",
            errors: error.issues
        });
    }
}