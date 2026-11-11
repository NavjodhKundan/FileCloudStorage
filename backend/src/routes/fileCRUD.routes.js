import { Router } from "express";
import { verifyToken } from "../middleware/tokens.js";
import { getAllFiles } from "../controllers/fileCRUD.controller.js";
import { fileUpload } from "../controllers/uploads.controllers.js";
import upload from "../middleware/fileUploader.js";
import { StorageCheck } from "../middleware/storageFunctions.js";
import { deleteFile } from "../controllers/fileCRUD.controller.js";

const fileOperationsRouter = Router();

fileOperationsRouter.post("/fileUploadController", verifyToken, upload.single("file"), StorageCheck, fileUpload);
fileOperationsRouter.get("/getAllFilesController", verifyToken, getAllFiles);
fileOperationsRouter.delete("/deleteFileController", verifyToken, deleteFile);

export default fileOperationsRouter;