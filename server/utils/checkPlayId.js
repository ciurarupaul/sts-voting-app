import models from "../models/index.js";

export default async function checkPlayId(votedPlayId) {
	const { Play } = models;
	const response = await Play.findOne({ where: { playId: votedPlayId } });

	return response;
}
