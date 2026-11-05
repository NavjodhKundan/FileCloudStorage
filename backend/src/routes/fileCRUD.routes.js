import { Router } from "express";
import { verifyToken } from "../middleware/tokens.js";
import { getAllFiles } from "../controllers/fileCRUD.controller.js";

const fileOperationsRouter = Router();

fileOperationsRouter.get("/fileoperationcontroller", verifyToken, getAllFiles);

export default fileOperationsRouter;