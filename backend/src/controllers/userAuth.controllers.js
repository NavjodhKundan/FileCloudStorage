import { supabase } from "../config/supabaseClient.js";
import { z } from "zod";
import { signupInfoVal, loginInfoVal } from "../middleware/userValidation.js";
import bcrypt from "bcryptjs";
import { createToken } from "../middleware/tokens.js";
import { createUserFolder } from "../middleware/CreateUserFolder.js";
import fs from "fs/promises";

export const userSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = signupInfoVal.parse(req.body);
        const { data: existing, error: lookupError } = await supabase.from("users").select('email').eq('email', email);
        if (lookupError){
            return res.status(500).json({ message: "Connection lost with database" });
        }
        if(existing.length > 0){
            return res.status(400).json({ message: "An account exists using this email" });
        } 
        const hashPassword = await bcrypt.hash(password, 10);
        const { data: createdUser, error: insert_error } = await supabase.from('users').insert({ 
            first_name:firstName, 
            last_name:lastName, email:email, 
            password:hashPassword, 
        }).select().maybeSingle();
        if(insert_error){
            return res.status(500).json({ message: "Error creating user" });
        }
        if(!createdUser){
            return res.status(500).json({ message: "did not recive user after creation" });
        }
        const accessToken = createToken(createdUser.id, createdUser.firs_name, createdUser.las_name);
        await createUserFolder(createdUser.first_name, createdUser.last_name, createdUser.id);
        return res.status(200).json({
            message: "successful", 
            accessToken: accessToken, 
            user: {
                id: createdUser.id, 
                firstName: createdUser.first_name, 
                lastName: createdUser.last_name, 
                email: createdUser.email,
                storageLimit: createdUser.storage_limit,
                storageUsed: createdUser.storage_used,
                createdAt: createdUser.created_at,
            }
        });
    } catch (error) {
        if(error instanceof z.ZodError){
            res.status(400).json({
                message: error.issues[0].message ?? "Invalid input",
                errors: error.issues
            });
        }
    }
}

export const userLogin = async (req, res) => {
    try{
        const { email, password } = loginInfoVal.parse(req.body);
        const { data , error } = await supabase.from('users').select().eq('email', email).maybeSingle();
        if (error){
            return res.status(500).json({ message:"Error connecting to database" });
        }
        if(!data){
            return res.status(404).json({ message:"no user found" });
        }
        
        const isMatch = await bcrypt.compare(password, data.password);
        if(!isMatch){
             return res.status(401).json({ message:"password does not match" });
        }
        const accessToken = createToken(data.id, data.first_name, data.last_name);
        return res.status(200).json({
            message: "successful",
            accessToken: accessToken,
            user: { 
                id: data.id,
                firstName: data.first_name, 
                lastName: data.last_name,
                email: data.email,
                storageLimit: data.storage_limit,
                storageUsed: data.storage_used,
                createdAt: data.created_at,
            }
        });
    } catch (error) {
        if(error instanceof z.ZodError){
            return res.status(400).json({
                message: error.issues[0].message ?? "Invalid input",
                errors: error.issues
            });
        }
        return res.status(500).json({ message: "Bad request, something went wrong" });
    }
}

export const deleteUserAccount = async (req, res) => {
    try{
        const userId = req.user.id;//getting user id from request

        //deleteing all records of user from database
        const { data:user, error:userError } = await supabase.from("users").delete().eq("id", userId).select().single();
        const { data:files, error:fileError } = await supabase.from("files").delete().eq("owner", userId).select("file_path");

        //checking for errors
        if(userError || fileError || !user || !files){
            return res.status(404).json({ message: "User or files not found." });
        }

        const userDirectory = `${user.first_name}_${user.last_name}_${userId}`;

        await fs.rm(userDirectory, {
            recursive: true,
            force: true
        });

        return res.status(200);
    } catch (error) {
        return res.status(500).json({ message: "Unable to delete account." });
    }
}