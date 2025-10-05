import express from "express"
import { createUser, getUser, userLogin } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.post("/",createUser);
userRouter.get("/",getUser);
userRouter.post("/login",userLogin);

export default userRouter;