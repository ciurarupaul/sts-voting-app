import express from "express";
import voteController from "../controllers/vote.js";

const router = express.Router();

router.route("/").post(voteController.castVote);

export default router;
