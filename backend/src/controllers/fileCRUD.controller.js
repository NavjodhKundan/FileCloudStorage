import { file } from "zod";
import { supabase } from "../config/supabaseClient.js";


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