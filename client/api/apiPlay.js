import apiConfig from "./apiConfig";

export async function getCurrentPlay() {
	const response = await apiConfig.get("/play/getCurrentPlay");

	return response.data.play;
}
