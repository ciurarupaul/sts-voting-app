import models from "../models/index.js";
import checkPlayId from "../utils/checkPlayId.js";
import dotenv from "dotenv";

dotenv.config();

const authController = {
	isAllowedToVote: async (req, res) => {
		// this checks the db for another vote from the same anonId
		// must provide the user's anonId and the play's id
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

	checkAdminPassword: async (req, res) => {
		try {
			const { password: submittedPassword } = req.query;

			if (!process.env.ADMIN_PASSWORD) {
				console.log("admin password is not defined!");
				return res.status(500).json({
					message: "Server misconfig: admin password is not defined",
					isPasswordCorrect: false,
				});
			}

			if (!submittedPassword) {
				console.log("submitted password is missing or undefined");
				return res.status(400).json({
					message: "Invalid input: password is required",
					isPasswordCorrect: false,
				});
			}

			const isPasswordCorrect =
				submittedPassword === process.env.ADMIN_PASSWORD;

			return res.status(200).json({
				message: isPasswordCorrect
					? "Validation successful"
					: "Validation failed",
				isPasswordCorrect,
			});
		} catch (error) {
			console.log("Error validating admin password:", error);
			return res.status(500).json({
				message: "Unexpected error",
				isPasswordCorrect: false,
			});
		}
	},
};

export default authController;
