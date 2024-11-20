import apiConfig from "./apiConfig";

export async function getCurrentPlay() {
	const response = await apiConfig.get("/play/getCurrentPlay");

	console.log("getCurrentPlay response: ", response);
	return response.data.play;
}
