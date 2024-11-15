// -------------------------------------------
// this will RESET the db before seeding !!!
// -------------------------------------------

import fs from "fs";
import path from "path";
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import PlayModel from "../models/play.js";
import VoteModel from "../models/vote.js";

const Play = PlayModel(sequelize, DataTypes);
const Vote = VoteModel(sequelize, DataTypes);

const playsDataPath = path.join(process.cwd(), "seeders", "plays.json");

const seedData = async () => {
	try {
		// connect to db
		await sequelize.authenticate();
		console.log("Connected to db");

		// reset db
		await sequelize.sync({ force: true });
		console.log("Db synced successfully");

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

seedData();
