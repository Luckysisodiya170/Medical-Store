import express from "express";
import {
  addMedicine,
  getMedicines,
  getMedicine,
  updateMedicine,
  deleteMedicine,
} from "../controllers/MedicineController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protectAdmin); // all routes protected

router.post("/", addMedicine);
router.get("/", getMedicines);
router.get("/:id", getMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export default router;
