import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Play = sequelize.define(
	"Play",
	{
		playId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		link: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "Plays",
		freezeTableName: true,
	}
);

export default Play;
