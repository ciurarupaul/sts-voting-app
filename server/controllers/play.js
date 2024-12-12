import models from "../models/index.js";

const playControler = {
	getActivePlayId: async (req, res) => {
		const { ActivePlay } = models;

		try {
			const activePlay = await ActivePlay.findOne({
				attributes: ["activePlayId"],
			});

			res.status(200).json({
				activePlayId: activePlay?.activePlayId || null,
			});
		} catch (error) {
			console.log("Error fetching the id of the active play:", error);

			res.status(500).json({
				message: "Error fetching the id of the active play",
				activePlayId: null,
				error,
			});
		}
	},

	getActivePlayData: async (req, res) => {
		const { Play } = models;
		const { activePlayId } = req.query;

		try {
			const activePlay = await Play.findByPk(activePlayId);

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
			console.log("Error fetching active play:", error);

			res.status(500).json({
				message: "Error fetching active play",
				play: null,
				error,
			});
		}
	},

	updateActivePlayId: async (req, res) => {
		const { ActivePlay } = models;

		try {
			const { newActivePlayId } = req.body;
			const [updatedRows] = await ActivePlay.update(
				{ activePlayId: newActivePlayId },
				{ where: { id: 1 } }
			);

			if (updatedRows === 0) {
				return res
					.status(204)
					.json({ message: "No rows were affected", updatedRows });
			}

			res.status(200).json({
				message: "Update successful",
				updatedRows,
			});
		} catch (error) {
			console.log("Error updating activePlayId:", error);

			res.status(500).json({
				message: "Error updating activePlayId",
				updatedRows: 0,
				error,
			});
		}
	},

	getAllPlays: async (req, res) => {
		const { Play } = models;

		try {
			const plays = await Play.findAll();

			if (!plays) {
				return res.status(204).json({
					message: "No plays found ",
					plays: null,
				});
			}

			res.status(200).json({
				message: "Success",
				plays,
			});
		} catch (error) {
			console.log("Error fetching plays:", error);

			res.status(500).json({
				message: "Error fetching plays",
				plays: null,
				error,
			});
		}
	},
};

export default playControler;
