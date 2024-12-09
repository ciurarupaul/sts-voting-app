import apiConfig from "./apiConfig.js";

// all functions return boolean answers (after destructuring)

export async function isAllowedToVote(anonId, playId) {
	const response = await apiConfig.get("/auth/isAllowedToVote", {
		params: {
			anonId,
			playId,
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

export async function checkJwtToken() {
	const response = await apiConfig.get("/auth/checkJwtToken");

	return response.data;
}
