import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import firebaseConfig from "../../api/firebase";
import { Loader } from "../ui/Loader";

// returns anonId, the user's anonimous firebase id

const UserContext = createContext();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const UserProvider = ({ children }) => {
	const [anonId, setAnonId] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// firebase's onAuthChanges is a listener that tracks changes in authentication state for the given user. unsubscribe as in unmount listener / stop consuming resources when the listener is not needed

		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setIsLoading(true);

			try {
				// if there is an authenticated user
				if (user) {
					setAnonId(user.uid);
					console.log(`user: ${user.uid}`);
				} else {
					// handle anonymous user sign-in
					const userCredential = await signInAnonymously(auth);
					setAnonId(userCredential.user.uid);
					console.log(`user: ${userCredential.user.uid}`);
				}
			} catch (error) {
				console.log("Error with userContext: ", error);
			} finally {
				setIsLoading(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<UserContext.Provider value={anonId}>
			{isLoading ? <Loader /> : children}
		</UserContext.Provider>
	);
};

function useUserContext() {
	const context = useContext(UserContext);

	if (context === undefined) {
		console.log(
			"useUserContext was used outside its scope. It must be used inside UserProvider!"
		);
	}

	return context;
}

export { UserProvider, useUserContext };
