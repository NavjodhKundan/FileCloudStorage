import { supabase } from "../config/supabaseClient.js";

export const StorageCheck = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const fileSize = req.file?.size;
        if(!userId || fileSize === undefined){
            return res.status(400).json({ message: "no user ID or file size found." });
        }
        const { data, error } = await supabase.from("users").select('storage_limit, storage_used').eq('id', userId).single();
        if(!data){
            return res.status(404).json({ message: "no user fond." });
        }
        if(error){
            return res.status(500).json({ message: "database connection error from users table." });
        }

        const storageAval = data.storage_limit - data.storage_used;

        if(fileSize > storageAval){
            return res.status(400).json({ message: "No enough storage space." });
        }

        req.strogeInfo = {storageAval};
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unable to check storage limit." })
    }
}