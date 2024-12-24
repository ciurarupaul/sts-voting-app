// -------------------------------------------
// this will RESET the Play table and seed it again
// -------------------------------------------

import fs from "fs";
import path from "path";
import sequelize from "../config/db.js";
import models from "../models/index.js";

const { Play } = models;

const playsDataPath = path.join(process.cwd(), "seeders", "plays.json");

const seedPlays = async () => {
	try {
		// connect to db
		await sequelize.authenticate();
		console.log("Connected to db");

		// disable fk checks
		await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

		await Play.drop();
		await Play.sync();
		console.log("Play table successfully reset");

		// re-enable fk checks
		await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");

		// get plays data from json file
		const playsData = JSON.parse(
			fs.readFileSync(playsDataPath, "utf-8")
		).plays;

		// insert plays into db
		await Play.bulkCreate(playsData);
		console.log("Plays table seeded successfully");
	} catch (err) {
		console.error("Unable to connect or seed the db: ", err);
	} finally {
		// close db connection
		await sequelize.close();
	}
};

seedPlays();
