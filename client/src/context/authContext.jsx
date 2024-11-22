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
			console.log("No active play. Skipping auth logic.");
			setAuthState((prevState) => ({
				...prevState,
				isLoading: false,
			}));
			return;
		}

		// firebase's onAuthChanges is a listener that tracks changes in authentication state for the given user. unsubscribe as in unmount listener / stop consuming resources when the listener is not needed
		if (listenerActive) return;
		listenerActive = true;

		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			// if there is an authenticated user
			if (user) {
				console.log("user already exists");
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
					`${user.uid} is allowed -- ${
						response && canVote
					} -- to vote`
				);
			} else {
				console.log("new user. created new id");
				// handle anonymous user sign-in
				const userCredential = await signInAnonymously(auth);

				const canVote = !hasVoted(
					userCredential.user.uid,
					currentPlayId
				);

				// no need to check db as well, since the anonId is new

				setAuthState({
					userId: userCredential.user.uid,
					isAllowedToVote: canVote,
					isLoading: false,
				});

				// dont use authState values to display as they are not updated yet
				console.log(
					`${userCredential.user.uid} is allowed -- ${canVote} to vote`
				);
			}
		});

		return () => {
			unsubscribe();
			listenerActive = false;
		};
	}, [currentPlayId]);

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
