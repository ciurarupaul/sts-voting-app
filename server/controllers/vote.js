import { isAllowedToVote } from "../../client/api/apiAuth.js";
import models from "../models/index.js";
import checkPlayId from "../utils/checkPlayId.js";

const voteController = {
	castVote: async (req, res) => {
		const { Vote } = models;

		try {
			const { anonId, voteOption, votedPlayId } = req.body;

			if (!anonId || !voteOption || !votedPlayId) {
				return res.status(400).json({
					message:
						"Please provide ids for both the user and the play, as well as a vote option",
				});
			}

			const response = checkPlayId(votedPlayId);
			if (!response) {
				res.status(400).json({ message: "Invalid play id" });
			}

			const isAllowed = await isAllowedToVote(anonId, votedPlayId);

			if (!isAllowed) {
				res.status(400).json({
					message: "Already voted",
				});
			}

			const newVote = new Vote({
				anonId,
				voteOption,
				votedPlayId,
			});

			await newVote.save();

			res.status(201).json({
				message: "Vote successfully cast",
				vote: newVote,
			});
		} catch (error) {
			console.log("Error casting vote:", error);
			res.status(500).json({ message: "Error casting vote", error });
		}
	},
};

export default voteController;
