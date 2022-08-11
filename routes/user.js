import express from "express";
import { getUsers, createUser, updateUserDetails, loginUser, accountLookUp } from "../controllers/users.js"


const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.post("/user", createUser);
userRouter.patch("/user/:phoneNumber", updateUserDetails);
userRouter.post("/userLogin", loginUser);
userRouter.post("/accountLookUp/:phoneNumber", accountLookUp);

export default userRouter;