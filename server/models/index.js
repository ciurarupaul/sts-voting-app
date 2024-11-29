import Play from "./playModel.js";
import Vote from "./voteModel.js";

const models = {};
models.Vote = Vote;
models.Play = Play;

Vote.belongsTo(Play, {
	foreignKey: "votedPlayId",
	as: "play",
});

Play.hasMany(Vote, {
	foreignKey: "votedPlayId",
	as: "votes",
});

export default models;
