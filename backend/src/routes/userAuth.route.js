import { Router } from "express";
import { userSignup } from "../controllers/userAuth.controllers.js";
import { userLogin } from "../controllers/userAuth.controllers.js";

const userAuthRouter = Router();

userAuthRouter.post("/signup", userSignup);
userAuthRouter.post("/login", userLogin);

export default userAuthRouter;