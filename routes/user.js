import express from "express";
import { getUsers, createUser, updateUserDetails } from "../controllers/users.js"


const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.post("/user", createUser);
userRouter.put("/user/:id", updateUserDetails);

export default userRouter;