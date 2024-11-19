function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop().split(";").shift();
	}
	return "";
}

function setCookie(name, value) {
	document.cookie = `${name}=${JSON.stringify(value)}`;
}

// check for flags
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

function addFlags(anonId, playId) {
	const newVote = { anonId, playId };

	// update localStorage
	const localVotes = JSON.parse(localStorage.getItem("votes")) || [];
	if (
		!localVotes.some(
			(vote) => vote.anonId === anonId && vote.playId === playId
		)
	) {
		localVotes.push(newVote);
		localStorage.setItem("votes", JSON.stringify(localVotes));
	}

	// update cookies
	const cookieVotes = JSON.parse(getCookie("votes") || "[]");
	if (
		!cookieVotes.some(
			(vote) => vote.anonId === anonId && vote.playId === playId
		)
	) {
		cookieVotes.push(newVote);
		setCookie("votes", cookieVotes);
	}
}

export { hasVoted, addFlags };
