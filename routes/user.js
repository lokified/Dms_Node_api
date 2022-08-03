import express from "express";
import { getUsers, createUser, updateUserDetails, loginUser } from "../controllers/users.js"


const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.post("/user", createUser);
userRouter.patch("/user/:id", updateUserDetails);
userRouter.post("/userLogin", loginUser);

export default userRouter;