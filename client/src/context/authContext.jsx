import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		isAllowedToVote: false,
		userId: null,
		isLoading: true,
	});

	// get anonID - if it exists, a new one will not be generated.

	// check cookies and localStorage for signs of prior voting for specific play
	//    -- keep these in sync

	// check if there was a vote with the existing anonId for the play

	// if everything clears, cast the vote

	// further optimizations
	// -- set expiration 2 hours for cookies

	// -- once the vote is casted, change the UI so there wont be multiple requests
	// -- debounce the casting
	// -- look into mySQL atomic transactions for casting votes (so there arent multiple vote requests at the same time)

	return (
		<AuthContext.Provider value={{ authState }}>
			{authState.isLoading ? "loading" : { children }}
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
