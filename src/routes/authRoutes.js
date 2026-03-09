// Import for express og controller
import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/registrer", authController.registrer);

export default router;