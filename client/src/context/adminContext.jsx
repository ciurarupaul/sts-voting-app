import { createContext, useContext, useEffect, useState } from "react";
import { checkAdminPassword, isLoggedIn } from "../../api/apiAuth";
import { Loader } from "../ui/Loader";
import { useUserContext } from "./userContext";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
	const [adminState, setAdminState] = useState({
		isLoggedIn: false,
		token: null,
		isLoading: true,
	});

	// on mount, check for an existing jwt token and set the admin as logged in if there is a valid token
	useEffect(() => {
		const checkLoggedIn = async () => {
			try {
				const res = await isLoggedIn();
				setAdminState({
					isLoggedIn: res.isLoggedIn,
					token: res.token,
					isLoading: false,
				});
			} catch (error) {
				console.log("Error checking jwt token: ", error);
				setAdminState({
					isLoggedIn: false,
					token: null,
					isLoading: false,
				});
			}
		};

		checkLoggedIn();
	}, []);

	const login = async (password) => {
		try {
			const { user } = useUserContext();
			const response = await checkAdminPassword(password, user);
		} catch (error) {
			console.log("Error logging in: ", error);
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
