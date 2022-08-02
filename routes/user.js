import express from "express";
import { getUsers, createUser, getUser, deleteUser , updateUser} from "../controllers/users.js"

const router = express.Router();

router.get("/api/users", getUsers);
router.post("/api/user", createUser);
router.get("/api/user/:id", getUser);
router.delete("/api/user/:id", deleteUser);
router.put("/api/user/:id", updateUser);

export default router;