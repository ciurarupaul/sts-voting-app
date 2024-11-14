import { getAuth, signInAnonymously } from "firebase/auth";
import firebaseApp from "../config/firebase.js";

const authController = {
	signInAnonymously: async (req, res) => {
		const auth = getAuth(firebaseApp);
		const user = auth.currentUser;

		// if there is an active session, return the user
		if (user) {
			console.log("user exists");

			res.status(200).json({
				message: "User already has an account",
				user,
			});
		}

		// if there is no active session, create new user
		try {
			const userCredential = await signInAnonymously(auth);

			res.status(201).json({
				message: "User signed in anonymously",
				userId: userCredential.user.uid,
			});
		} catch (error) {
			console.error("Error signing in anonymously:", error);

			res.status(500).json({
				message: "Error signing in anonymously",
				error: error.message,
			});
		}
	},
};

export default authController;
