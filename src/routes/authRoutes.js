// Import for express og controller
import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { verifiserToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/registrer", authController.registrer);

router.post("/login", authController.login);

router.get("/verifiser", verifiserToken, authController.verifiser);

router.get("/loggut", authController.logout);

export default router;