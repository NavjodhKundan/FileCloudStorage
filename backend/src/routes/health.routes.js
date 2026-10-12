import { Router } from "express";
import { checkHealth } from "../controllers/helth.controller.js";

const router = Router();
router.get("/", checkHealth);

export default router;