import apiConfig from "./apiConfig.js";

// all functions return boolean answers (after destructuring)

export async function isAllowedToVote(anonId, votedPlayId) {
	const response = await apiConfig.get("/auth/isAllowedToVote", {
		params: {
			anonId,
			votedPlayId,
		},
	});

	return response.data.isAllowed;
}

export async function checkAdminPassword(password, anonId) {
	const response = await apiConfig.get("/auth/checkAdminPassword", {
		params: { password, anonId },
	});

	return response.data.isPasswordCorrect;
}

export async function isLoggedIn() {
	const response = await apiConfig.get("/auth/isLoggedIn");

	return response.data;
}
