import apiConfig from "./apiConfig";

export async function getCurrentPlay(currentPlayId) {
	const response = await apiConfig.get("/play/getCurrentPlay", {
		params: {
			currentPlayId,
		},
	});

	return response.data.play;
}

export async function getAllPlays() {
	const response = await apiConfig.get("/play/getAllPlays");

	return response.data.plays;
}
