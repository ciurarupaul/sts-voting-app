import { createContext, useContext, useEffect, useState } from "react";
import { isAllowedToVote } from "../../api/apiAuth";
import { castVote } from "../../api/apiVote";
import { Loader } from "../ui/Loader";
import { addFlags, hasVoted } from "../utils/flagManipulation";
import { usePlayContext } from "./playContext";
import { useUserContext } from "./userContext";

const VoteContext = createContext();

const VoteProvider = ({ children }) => {
	const [voteState, setVoteState] = useState({
		isAllowedToVote: false,
		isLoading: true,
	});

	// get play
	const { playState } = usePlayContext();
	const currentPlayId = playState.currentPlay
		? playState.currentPlay.playId
		: null;

	// get user
	const { userState } = useUserContext();
	const user = userState.userId;

	const [isMounted, setIsMounted] = useState(true);

	useEffect(() => {
		return () => setIsMounted(false);
	}, []);

	useEffect(() => {
		if (!currentPlayId) {
			setVoteState({
				isAllowedToVote: false,
				isLoading: false,
			});
			return;
		}

		const checkVote = async () => {
			try {
				// check for flags in cookies and localStorage
				const noFlags = !hasVoted(user, currentPlayId);
				// check if they have voted before (check db for votes for specific/current play)
				const noPriorVotes = await isAllowedToVote(user, currentPlayId);

				// only set state if component is still mounted
				if (isMounted) {
					setVoteState({
						isAllowedToVote: noFlags && noPriorVotes,
						isLoading: false,
					});
				}
			} catch (error) {
				console.log("Error checking votes: ", error);

				if (isMounted) {
					setVoteState({
						isAllowedToVote: false,
						isLoading: false,
					});
				}
			}
		};

		checkVote();
	}, [currentPlayId, user, isMounted]);

	const castVoteInContext = async (voteOption) => {
		try {
			const response = await castVote(user, voteOption, currentPlayId);

			if (response.data.vote) {
				addFlags(user, currentPlayId);

				setVoteState({
					isAllowedToVote: false,
					isLoading: false,
				});
			}
		} catch (error) {
			console.log("Error casting the vote: ", error);
		}
	};

	return (
		<VoteContext.Provider value={{ voteState, castVoteInContext }}>
			{voteState.isLoading ? <Loader /> : children}
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
