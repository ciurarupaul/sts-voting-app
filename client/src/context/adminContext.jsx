import { createContext, useContext, useState } from "react";
import { Loader } from "../ui/Loader";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
	const [adminState, setAdminState] = useState({
		isLoading: true,
	});

	return (
		<AdminContext.Provider value={{ adminState }}>
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

export { useAdminContext, AdminProvider };
