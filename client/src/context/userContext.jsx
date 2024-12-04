import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import firebaseConfig from "../../api/firebase";
import { Loader } from "../ui/Loader";

const UserContext = createContext();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const UserProvider = ({ children }) => {
	const [userState, setUserState] = useState({
		userId: null,
		isLoading: true,
	});

	useEffect(() => {
		// firebase's onAuthChanges is a listener that tracks changes in authentication state for the given user. unsubscribe as in unmount listener / stop consuming resources when the listener is not needed

		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			try {
				// if there is an authenticated user
				if (user) {
					setUserState({
						userId: user.uid,
						isLoading: false,
					});
				} else {
					// handle anonymous user sign-in
					const userCredential = await signInAnonymously(auth);

					setUserState({
						userId: userCredential.user.uid,
						isLoading: false,
					});
				}
			} catch (error) {
				console.log("Error with auth: ", error);
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<UserContext.Provider value={{ userState }}>
			{userState.isLoading ? <Loader /> : children}
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
