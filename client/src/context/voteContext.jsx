import { createContext, useContext, useEffect, useState } from "react";
import { isAllowedToVote as checkPriorVotes } from "../../api/apiAuth";
import { castVote } from "../../api/apiVote";
import { Loader } from "../ui/Loader";
import { addFlags, hasVoted } from "../utils/flagManipulation";
import { usePlayContext } from "./playContext";
import { useUserContext } from "./userContext";

// return isAllowedToVote (boolean) and castVoteInContext (function used to cast a vote)

const VoteContext = createContext();

const VoteProvider = ({ children }) => {
	const [isAllowedToVote, setIsAllowedToVote] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const currentPlay = usePlayContext();
	const anonId = useUserContext();
	const playId = currentPlay?.playId;

	useEffect(() => {
		const checkVote = async () => {
			setIsLoading(true);

			if (!currentPlay || !anonId) {
				setIsAllowedToVote(false);
				setIsLoading(false);
				return;
			}

			try {
				const noFlags = !hasVoted(anonId, playId); // check cookies and localStorage
				const noPriorVotes = await checkPriorVotes(anonId, playId); // check DB

				setIsAllowedToVote(noFlags && noPriorVotes);
				console.log(
					`User is allowed to vote -- ${noFlags && noPriorVotes}`
				);
			} catch (error) {
				console.error("Error checking votes:", error);
				setIsAllowedToVote(false);
			} finally {
				setIsLoading(false);
			}
		};

		checkVote();
	}, [anonId, currentPlay, playId]);

	const castVoteInContext = async (anonId, voteOption, playId) => {
		try {
			if (!playId) {
				console.log("no playId");
				return;
			}

			const response = await castVote(anonId, voteOption, playId);

			if (response.data.vote) {
				addFlags(anonId, playId);
				setIsAllowedToVote(false);
			}
		} catch (error) {
			console.log("Error casting the vote: ", error);
		}
	};

	return (
		<VoteContext.Provider value={{ isAllowedToVote, castVoteInContext }}>
			{isLoading ? <Loader /> : children}
		</VoteContext.Provider>
	);
};

function useVoteContext() {
	const context = useContext(VoteContext);

	if (context === undefined) {
		console.log(
			"useVoteContext was used outside its scope. It must be used inside VoteProvider!"
		);
	}

	return context;
}

export { useVoteContext, VoteProvider };
