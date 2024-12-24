// -------------------------------------------
// for RESETTING the Votes and ActivePlay tables
// -------------------------------------------

import sequelize from "../config/db.js";
import models from "../models/index.js";

const { Vote, ActivePlay } = models;

const seedVoteAndActivePlay = async () => {
	try {
		// connect to db
		await sequelize.authenticate();
		console.log("Connected to db");

		// reset Votes table
		await Vote.sync({ force: true });
		console.log("Votes table successfully reset");

		// reset ActivePlay table
		await ActivePlay.sync({ force: true });
		console.log("ActivePlay table successfully reset");

		// seed a null activePlay entry
		await ActivePlay.create({ activePlayId: null });
		console.log("ActivePlay table successfully seeded");
	} catch (err) {
		console.error("Unable to connect or seed the db: ", err);
	} finally {
		// close db connection
		await sequelize.close();
	}
};

seedVoteAndActivePlay();
