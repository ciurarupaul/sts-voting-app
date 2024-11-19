import models from "../models/index.js";
import checkPlayId from "../utils/checkPlayId.js";

const authController = {
	// this checks the db for another vote from the same anonId
	// must provide the user's anonId and the play's id
	isAllowedToVote: async (req, res) => {
		const { anonId, votedPlayId } = req.query;
		const { Vote } = models;

		if (!anonId || !votedPlayId)
			res.status(400).json({
				message: "Please provide the id for both the play and the user",
				isAllowed: false,
			});

		const response = checkPlayId(votedPlayId);
		if (!response) {
			res.status(400).json({ message: "Invalid play id" });
		}

		try {
			const existingVote = await Vote.findOne({
				// match both provided ids
				where: {
					anonId,
					votedPlayId,
				},
			});

			if (existingVote)
				res.status(200).json({
					message: "User already voted for this play",
					isAllowed: false,
					vote: existingVote,
				});
			else
				res.status(200).json({
					message: "User is allowed to vote",
					isAllowed: true,
				});
		} catch (error) {
			console.log("Error checking eligibility:", error);

			res.status(500).json({
				message: "Error checking eligibility",
				isAllowed: false,
				error: error.message,
			});
		}
	},
};

export default authController;
