import models from "../models/index.js";
import { Op } from "sequelize";

const playControler = {
	getCurrentPlay: async (req, res) => {
		const { Play } = models;

		try {
			const now = new Date();
			const activePlay = await Play.findOne({
				where: {
					startVote: { [Op.lte]: now },
					endVote: { [Op.gte]: now },
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
