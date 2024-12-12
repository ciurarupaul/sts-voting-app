import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const ActivePlay = sequelize.define(
	"ActivePlay",
	{
		activePlayId: {
			type: DataTypes.INTEGER,
			allowNull: true, // can be null
			defaultValue: null,
		},
	},
	{
		tableName: "activePlayId",
		freezeTableName: true,
		unique: true,
		timestamps: false,
	}
);

export default ActivePlay;
