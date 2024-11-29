import { Sequelize } from "sequelize";

const dbConnection = new Sequelize("sts-voting-app", "root", "", {
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
