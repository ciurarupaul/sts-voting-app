const VoteModel = (sequelize, DataTypes) => {
	const Vote = sequelize.define(
		"Vote",
		{
			// uuid generated by firebase's anonymous auth
			anonId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			// the value of the vote, 'DA' or 'NU'
			castedVote: {
				type: DataTypes.ENUM("DA", "NU"),
				allowNull: false,
			},
			// the id of the play the user voted for ; also foreign key
			votedPlayId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: "Plays",
					key: "playId",
				},
			},
		},
		{
			tableName: "Votes",
		}
	);

	// associate the vote with the play
	Vote.associate = (models) => {
		Vote.belongsTo(models.Play, {
			foreignKey: "votedPlayId",
			as: "play",
		});
	};

	return Vote;
};

export default VoteModel;
