import { Op } from "sequelize";
import models from "../models/index.js";

// if more multiple palys have an active vote session at the same time, only the first one will be displayed
// that shouldn't happen, just fyi

const playControler = {
	getCurrentPlay: async (req, res) => {
		const { Play } = models;

		try {
			const currentDate = new Date();
			const timeZoneOffset = 2 * 60; // utc + 2

			const now = new Date(
				currentDate.getTime() + timeZoneOffset * 60 * 1000
			);

			const activePlay = await Play.findOne({
				where: {
					[Op.and]: [
						{ startVote: { [Op.lte]: now } },
						{ endVote: { [Op.gte]: now } },
					],
				},
			});

			if (!activePlay) {
				return res.status(204).send();
			}

			res.status(200).json({
				message: "Active play found",
				play: activePlay,
			});
		} catch (error) {
			console.error("Error fetching active play:", error);

			res.status(500).json({
				message: "Error fetching active play",
				error,
			});
		}
	},
};

export default playControler;
