import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = new Sequelize("sts-voting-app", process.env.MYSQL, process.env.PASSWORD, {
	host: "localhost",
	dialect: "mysql",
	define: {
		charset: "utf8",
		collate: "utf8_general_ci",
		timestamps: true,
	},
	logging: false,
});

export default dbConnection;
