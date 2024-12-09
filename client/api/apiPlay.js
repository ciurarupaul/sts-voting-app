import apiConfig from "./apiConfig";

export async function getCurrentPlay(currentPlayId) {
	const response = await apiConfig.get("/play/getCurrentPlay", {
		params: {
			currentPlayId,
		},
	});

	return response.data.play;
}
