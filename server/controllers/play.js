import models from "../models/index.js";

const playControler = {
	getCurrentPlay: async (req, res) => {
		const { Play } = models;
		const { currentPlayId } = req.query;

		try {
			const activePlay = await Play.findByPk(currentPlayId);

			if (!activePlay) {
				return res.status(204).json({
					message: "No play matches the provided ID",
					play: null,
				});
			}

			res.status(200).json({
				message: "Active play found",
				play: activePlay,
			});
		} catch (error) {
			console.error("Error fetching active play:", error);

			res.status(500).json({
				message: "Error fetching active play",
				play: null,
				error,
			});
		}
	},
};

export default playControler;
