import multer from "multer";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const STORAGE_PATH = process.env.FILE_PATH;

const storage = multer.diskStorage({
    destination: async(req, file, callback) => {
        try {
            const userId = req.user.id;
            const firstName = req.user.firstName;
            const lastName = req.user.lastName;

            const folderName = `${firstName}_${lastName}_${userId}`;

            const folderPath = path.join(STORAGE_PATH, folderName);

            await fs.mkdir(folderPath, { recursive: true });

            callback(null, folderPath);
        } catch (error) {
            callback(error);
        }
    },

    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        const uniqueName = `${randomUUID()}${extension}`;
        callback(null, uniqueName);
    }
})

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 10*1024*1024,
        files: 1
    }
})

export default upload;