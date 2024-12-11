import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/adminContext";
import { useUserContext } from "../context/userContext";
import { Loader } from "../ui/Loader";

function LoginPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	// ref to get input value
	const inputRef = useRef(null);
	// function for login
	const { login } = useAdminContext();
	// get user
	const user = useUserContext();
	// admin state to check if a jwt token was found
	const { adminState } = useAdminContext();

	// useEffect to check current login status
	useEffect(() => {
		if (adminState.isLoading) {
			setIsLoading(true);
			return;
		}

		setIsLoading(false);
		if (adminState.isLoggedIn && adminState.token) {
			navigate("/admin");
		}
	}, [
		adminState.isLoading,
		adminState.isLoggedIn,
		adminState.token,
		navigate,
	]);

	if (isLoading) return <Loader />;

	return (
		<div className="loginPage page-container">
			<input type="text" className="loginPage__input" ref={inputRef} />
			<button
				className="loginPage__button"
				onClick={async () => {
					await login(inputRef.current.value, user);
				}}
			/>
		</div>
	);
}

export default LoginPage;
