import express from "express";
import playControler from "../controllers/play.js";

const router = express.Router();

router.route("/getCurrentPlay").get(playControler.getCurrentPlay);
router.route("/getAllPlays").get(playControler.getAllPlays);

export default router;
