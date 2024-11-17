import { getAuth, signInAnonymously } from "firebase/auth";
import firebaseApp from "../config/firebase.js";
import models from "../models/index.js";

const authController = {
	anonSignIn: async (req, res) => {
		const { anonId } = req.body;

		// !!! might remove this check and include the logic in the authContext
		// if an anonId is provided, the user already exists
		if (anonId) {
			res.status(200).json({
				message: "User already has an account",
				anonId,
			});
		}

		// if no id is provided, initiate anonymous sign in
		const auth = getAuth(firebaseApp);

		try {
			const userCredential = await signInAnonymously(auth);

			res.status(201).json({
				message: "User signed in anonymously",
				anonId: userCredential.user.uid,
			});
		} catch (error) {
			console.error("Error signing in anonymously:", error);

			res.status(500).json({
				message: "Error signing in anonymously",
				error: error.message,
			});
		}
	},

	// this checks the db for another vote from the same anonId
	// must provide the user's anonId and the play's id
	isAllowedToVote: async (req, res) => {
		const { anonId, votedPlayId } = req.body;
		const { Vote } = models;

		if (!anonId || !votedPlayId)
			res.status(400).json({
				message: "Please provide the id for both the play and the user",
				isAllowed: false,
			});

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
			console.error("Error checking eligibility:", error);

			res.status(500).json({
				message: "Error checking eligibility",
				isAllowed: false,
				error: error.message,
			});
		}
	},
};

export default authController;
