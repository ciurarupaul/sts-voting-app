import express from "express";
import playControler from "../controllers/play.js";

const router = express.Router();

router.route("/getActivePlayId").get(playControler.getActivePlayId);
router.route("/getActivePlayData").get(playControler.getActivePlayData);
router.route("/getAllPlays").get(playControler.getAllPlays);
router.route("/updateActivePlayId").patch(playControler.updateActivePlayId);
router.route("/getVoteResultsForPlay").get(playControler.getVoteResultsForPlay);

export default router;
