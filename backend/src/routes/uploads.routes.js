import { Router } from "express";
import { verifyToken } from "../middleware/tokens.js";
import { fileUpload } from "../controllers/uploads.controllers.js";
import upload from "../middleware/fileUploader.js";
import { StorageCheck } from "../middleware/storageCheck.js";

const uploadsRouter = Router();
uploadsRouter.post("/fileUploadController", verifyToken, upload.single("file"), StorageCheck, fileUpload);

export default uploadsRouter;