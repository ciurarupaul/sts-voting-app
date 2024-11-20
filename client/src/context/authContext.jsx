/* 
********** ISSUES **********
in development (i hope not in prod as well), firebase generates two ids for a new user -- might be because of the strict mode / two renders from dev env -- fix later

*/

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { isAllowedToVote } from "../../api/apiAuth";
import { castVote } from "../../api/apiVote";
import firebaseConfig from "../../api/firebase";
import { addFlags, hasVoted } from "../utils/flagManipulation";
import { Loader } from "../ui/Loader";
import { usePlayContext } from "./playContext";

const AuthContext = createContext();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		isAllowedToVote: false,
		userId: null,
		isLoading: true,
	});

	const { playState } = usePlayContext();
	const currentPlayId = playState.currentPlay
		? playState.currentPlay.playId
		: null;

	let listenerActive = false;

	useEffect(() => {
		if (!currentPlayId) {
			console.log("No active play. Skipping authentication logic.");
			setAuthState((prevState) => ({
				...prevState,
				isLoading: false, // Stop loading state even when there's no play
			}));
			return;
		}

		// firebase's onAuthChanges is a listener that tracks changes in authentication state for the given user. unsubscribe as in unmount listener / stop consuming resources when the listener is not needed
		if (listenerActive) return;
		listenerActive = true;

		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			// if there is an authenticated user
			if (user) {
				console.log("went on the existing user path");
				// check for flags in cookies and localStorage
				const canVote = !hasVoted(user.uid, currentPlayId);

				// check if they have voted before (check db for votes for specific/current play)
				const response = await isAllowedToVote(user.uid, currentPlayId);

				setAuthState({
					isAllowedToVote: canVote && response,
					userId: user.uid,
					isLoading: false,
				});

				console.log(
					`User ${user.uid} (existing) is allowed -- ${
						response && canVote
					} -- to vote`
				);
			} else {
				console.log("went on the new user path");
				// handle anonymous user sign-in
				const userCredential = await signInAnonymously(auth);

				const canVote = !hasVoted(
					userCredential.user.uid,
					currentPlayId
				);

				// no need to check db as well, since the anonId is new

				console.log("new id", userCredential.user.uid);

				setAuthState({
					userId: userCredential.user.uid,
					isAllowedToVote: canVote,
					isLoading: false,
				});

				// dont use authState values to display as they are not updated yet
				console.log(
					`User ${userCredential.user.uid} (new) is allowed -- ${canVote} to vote`
				);
			}
		});

		return () => {
			unsubscribe();
			listenerActive = false;
		};
	}, []);

	const castVoteInContext = async (voteOption) => {
		try {
			const response = await castVote(
				authState.userId,
				voteOption,
				currentPlayId
			);

			if (response.data.vote) {
				addFlags(authState.userId, currentPlayId);

				setAuthState((prevState) => ({
					...prevState,
					isAllowedToVote: false,
				}));
			}

			console.log("Vote succesfully cast ");
		} catch (error) {
			console.log("Error casting the vote: ", error);
		}
	};

	return (
		<AuthContext.Provider value={{ authState, castVoteInContext }}>
			{authState.isLoading ? <Loader /> : children}
		</AuthContext.Provider>
	);
};

/* 
for easier context integration inside components
eg: const {authState} = useAuthContext();
instead of
const {authState} = useContext(AuthContext);
*/
function useAuthContext() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		console.log(
			"useAuthContext was used outside its scope. It must be used inside AuthProvider!"
		);
	}

	return context;
}

export { AuthProvider, useAuthContext };
