import apiConfig from "./apiConfig.js";

export async function isAllowedToVote(anonId, votedPlayId) {
	const response = await apiConfig.get("/auth/isAllowedToVote", {
		params: {
			anonId,
			votedPlayId,
		},
	});

	// returns directly true or false
	return response.data.isAllowed;
}
