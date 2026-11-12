import { Router } from "express";
import { verifyToken } from "../middleware/tokens.js";
import { getAllFiles } from "../controllers/fileCRUD.controller.js";
import { fileUpload } from "../controllers/uploads.controllers.js";
import upload from "../middleware/fileUploader.js";
import { StorageCheck } from "../middleware/storageFunctions.js";
import { deleteFile } from "../controllers/fileCRUD.controller.js";
import { downloadFile } from "../controllers/fileCRUD.controller.js";

const fileOperationsRouter = Router();

fileOperationsRouter.post("/uploadFile", verifyToken, upload.single("file"), StorageCheck, fileUpload);
fileOperationsRouter.get("/getAllFiles", verifyToken, getAllFiles);
fileOperationsRouter.delete("/deleteFile", verifyToken, deleteFile);
fileOperationsRouter.get("/downloadFile/:fileId", verifyToken, downloadFile);

export default fileOperationsRouter;