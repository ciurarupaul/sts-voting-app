import express from "express";
import authController from "../controllers/auth.js";

const router = express.Router();

router.route("/isAllowedToVote").get(authController.isAllowedToVote);
router.route("/checkAdminPassword").get(authController.checkAdminPassword);
router.route("/isLoggedIn").get(authController.checkJwtToken);

export default router;
