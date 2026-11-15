import { Router } from "express";
import { userSignup } from "../controllers/userAuth.controllers.js";
import { userLogin } from "../controllers/userAuth.controllers.js";
import { deleteUserAccount } from "../controllers/userAuth.controllers.js";
import { verifyToken } from "../middleware/tokens.js";
import { checkUserSession } from "../controllers/userAuth.controllers.js";

const userAuthRouter = Router();

userAuthRouter.post("/signup", userSignup);
userAuthRouter.post("/login", userLogin);
userAuthRouter.delete("/deleteAccount", verifyToken, deleteUserAccount);
userAuthRouter.get("/checkUserSession", verifyToken, checkUserSession);

export default userAuthRouter;