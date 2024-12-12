import Play from "./playModel.js";
import Vote from "./voteModel.js";
import ActivePlay from "./activePlayModel.js";

const models = {};
models.Vote = Vote;
models.Play = Play;
models.ActivePlay = ActivePlay;

Vote.belongsTo(Play, {
	foreignKey: "votedPlayId",
	as: "play",
});

Play.hasMany(Vote, {
	foreignKey: "votedPlayId",
	as: "votes",
});

export default models;
