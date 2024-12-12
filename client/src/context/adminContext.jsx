import { createContext, useContext, useEffect, useState } from "react";
import { checkAdminPassword, checkJwtToken } from "../../api/apiAuth";
import { Loader } from "../ui/Loader";
import { usePlayContext } from "./playContext";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
	const [adminState, setAdminState] = useState({
		isLoggedIn: false,
		token: null,
		isLoading: true,
	});

	const { currentPlayId } = usePlayContext();

	useEffect(() => {
		const checkLoggedIn = async () => {
			setAdminState((prevState) => ({ ...prevState, isLoading: true }));

			try {
				const result = await checkJwtToken();
				setAdminState({
					isLoggedIn: result.isTokenValid,
					token: result.token,
					isLoading: false,
				});
			} catch (error) {
				console.log("Error checking jwt token: ", error);
				setAdminState({
					isLoggedIn: false,
					token: null,
					isLoading: false,
					error,
				});
			}
		};

		checkLoggedIn();
	}, [currentPlayId]);

	const login = async (password, user) => {
		try {
			setAdminState((prevState) => ({ ...prevState, isLoading: true }));

			// if the password is correct, a jwt token will be set
			await checkAdminPassword(password, user);

			// check said token
			const { isTokenValid, token: retrievedToken } =
				await checkJwtToken();

			if (isTokenValid) {
				setAdminState({
					isLoggedIn: true,
					token: retrievedToken,
					isLoading: false,
				});
			} else {
				setAdminState({
					isLoggedIn: false,
					token: null,
					isLoading: false,
				});
			}
		} catch (error) {
			console.log("Error logging in: ", error);
			setAdminState({
				isLoggedIn: false,
				token: null,
				isLoading: false,
			});
		}
	};

	return (
		<AdminContext.Provider value={{ adminState, login }}>
			{AdminContext.isLoading ? <Loader /> : children}
		</AdminContext.Provider>
	);
};

function useAdminContext() {
	const context = useContext(AdminContext);

	if (context === undefined) {
		console.log(
			"useAdminContext was used outside its scope. It must be used inside AdminContext!"
		);
	}

	return context;
}

export { AdminProvider, useAdminContext };
