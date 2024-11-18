import express from "express";
import authController from "../controllers/auth.js";

const router = express.Router();

router.route("/isAllowedToVote").get(authController.isAllowedToVote);

export default router;
