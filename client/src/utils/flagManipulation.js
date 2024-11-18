function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop().split(";").shift();
	}
	return "";
}

function hasVoted(anonId, playId) {
	// check localStorage for votes
	const votes = JSON.parse(localStorage.getItem("votes")) || [];
	const votedInLocalStorage = votes.some(
		(vote) => vote.anonId === anonId && vote.playId === playId
	);

	// check cookies for votes
	const cookieVotes = JSON.parse(getCookie("votes") || "[]");
	const votedInCookies = cookieVotes.some(
		(vote) => vote.anonId === anonId && vote.playId === playId
	);

	return votedInLocalStorage || votedInCookies;
}

// will also add functions to set the flags

export { hasVoted };
