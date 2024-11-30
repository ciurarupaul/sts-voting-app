import apiConfig from "./apiConfig.js";

export async function isAllowedToVote(anonId, votedPlayId) {
	const response = await apiConfig.get("/auth/isAllowedToVote", {
		params: {
			anonId,
			votedPlayId,
		},
	});

	// boolean res -- true if isAllowed and false if not
	return response.data.isAllowed;
}

export async function checkAdminPassword(password) {
	const response = await apiConfig.get("/auth/checkAdminPassword", {
		params: { password },
	});

	// same boolean res
	return response.data.isPasswordCorrect;
}
