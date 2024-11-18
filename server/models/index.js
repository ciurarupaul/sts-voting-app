import Play from "./play.js";
import Vote from "./vote.js";

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
