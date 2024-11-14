import authController from "./auth.js";

const req = {};
const res = {
	status: (code) => {
		return {
			json: (data) => {
				console.log(`Status: ${code}`);
				console.log("Response:", data);
			},
		};
	},
};

authController.signInAnonymously(req, res);
