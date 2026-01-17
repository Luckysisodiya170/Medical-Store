import express from "express";
import { getAllUsers, createUser, updateUser,deleteUser } from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";


const router = express.Router();

router.get("/users", adminAuth, getAllUsers);
router.post("/users", adminAuth, createUser);
router.put("/users/:id", adminAuth, updateUser);
router.delete("/users/:id", adminAuth, deleteUser);

export default router;
