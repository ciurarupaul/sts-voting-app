import models from "../models/index.js";
import { isAllowedToVote } from "../../client/api/apiAuth.js";

const voteController = {
	castVote: async (req, res) => {
		const { Vote, Play } = models;

		try {
			const { anonId, voteOption, votedPlayId } = req.body;
			console.log(req.body);

			if (!anonId || !voteOption || !votedPlayId) {
				return res.status(400).json({
					message:
						"Please provide ids for both the user and the play, as well as a vote option",
				});
			}

			const playExists = await Play.findOne({
				where: { playId: votedPlayId },
			});
			if (!playExists) {
				return res.status(400).json({
					message: "Invalid play ID.",
				});
			}

			const isAllowed = await isAllowedToVote(anonId, votedPlayId);

			if (isAllowed) {
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
			} else {
				res.status(400).json({
					message: "Already voted",
				});
			}
		} catch (error) {
			console.error("Error casting vote:", error);
			res.status(500).json({ message: "Error casting vote", error });
		}
	},
};

export default voteController;
