import fs from "fs/promises";
import path from "path";

const STORAGE_PATH = process.env.FILE_PATH;

export const createUserFolder = async (firstName, lastName, userId) => {
    const folderName = `${firstName}_${lastName}_${userId}`;
    const userFolderPath = path.join(STORAGE_PATH, folderName);
    await fs.mkdir(userFolderPath, {recursive: true});
    return userFolderPath;
}