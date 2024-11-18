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
		// the date and time when voting for this play starts
		startVote: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		endVote: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		tableName: "Plays",
		freezeTableName: true,
	}
);

export default Play;
