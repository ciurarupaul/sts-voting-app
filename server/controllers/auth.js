import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import models from "../models/index.js";
import checkPlayId from "../utils/checkPlayId.js";

dotenv.config();

const signToken = (anonId) => {
	return jwt.sign({ anonId }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

// check config here if there are cookies related bugs !!!
const createSendToken = (anonId, res) => {
	const token = signToken(anonId);
	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		// sameSite: "None", // **** add if back and front are on different domains ****
		// sameSite: "Strict", // if back and front are on hosted on the same domain
		secure: true, // cookie will only be sent over HTTPS
	};

	res.cookie("jwt", token, cookieOptions);

	res.status(201).json({
		token,
		user: id,
	});
};

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
			const { password: submittedPassword, anonId } = req.query;

			if (!process.env.ADMIN_PASSWORD) {
				console.log("admin password is not defined!");
				return res.status(500).json({
					message: "Server misconfig: admin password is not defined",
				});
			}

			if (!submittedPassword) {
				console.log("submitted password is missing or undefined");
				return res.status(400).json({
					message: "Invalid input: password is required",
				});
			}

			const isPasswordCorrect =
				submittedPassword === process.env.ADMIN_PASSWORD;

			// if password is correct, sign token
			if (isPasswordCorrect) createSendToken(anonId, res);

			return res.status(200).json({
				message: isPasswordCorrect
					? "Validation successful"
					: "Validation failed",
			});
		} catch (error) {
			console.log("Error validating admin password:", error);
			return res.status(500).json({
				message: "Unexpected error",
			});
		}
	},

	isLoggedIn: async (req, res) => {
		try {
			let token;

			// get token
			if (
				req.headers.authorization &&
				req.headers.authorization.startsWith("Bearer")
			) {
				token = req.headers.authorization.split(" ")[1];
			} else if (req.cookies.jwt) {
				token = req.cookies.jwt;
			}

			if (!token) {
				return res.status(200).json({
					message: "Admin is not logged in",
					isLoggedIn: false,
				});
			}

			// verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET, {
				ignoreExpiration: true,
			});

			const isExpired = decoded.exp * 1000 < Date.now();
			if (isExpired) {
				// if expired, clear cookie
				res.clearCookie("jwt");
				return res.status(200).json({
					message: "Token is expired. Please log in again.",
					isLoggedIn: false,
				});
			}

			res.status(200).json({
				message: "Admin is already logged in",
				isLoggedIn: true,
			});
		} catch (error) {
			console.log("Error checking if admin is logged in:", error);
			return res.status(500).json({
				message: "Unexpected error",
				isLoggedIn: false,
			});
		}
	},
};

export default authController;
