import Vote from "./vote";
import Play from "./play";

const models = {};
models.Vote = Vote;
models.Play = Play;

// Define associations between tables
Vote.belongsTo(Play, {
	foreignKey: "votedPlayId",
	as: "play",
});

Play.hasMany(Vote, {
	foreignKey: "votedPlayId",
	as: "votes",
});

export default models;
