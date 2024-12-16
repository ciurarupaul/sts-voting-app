import apiConfig from "./apiConfig";

export async function getActivePlayId() {
	const response = await apiConfig.get("/play/getActivePlayId");

	return response.data.activePlayId;
}

export async function getActivePlayData(activePlayId) {
	const response = await apiConfig.get("/play/getActivePlayData", {
		params: {
			activePlayId,
		},
	});

	return response.data.play;
}

export async function updateActivePlayId(newActivePlayId) {
	const response = await apiConfig.patch("/play/updateActivePlayId", {
		newActivePlayId,
	});

	return response.data.updatedRows;
}

export async function getAllPlays() {
	const response = await apiConfig.get("/play/getAllPlays");

	return response.data.plays;
}

export async function getVoteResultsForPlay(playId) {
	const response = await apiConfig.get("/play/getVoteResultsForPlay", {
		params: {
			playId,
		},
	});

	return response.data.results;
}
