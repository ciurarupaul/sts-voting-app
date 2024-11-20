import apiConfig from "./apiConfig.js";

export async function castVote(anonId, voteOption, votedPlayId) {
	const response = await apiConfig.post("/vote", {
		anonId,
		voteOption,
		votedPlayId,
	});

	console.log("castVote response: ", response);
	return response;
}
