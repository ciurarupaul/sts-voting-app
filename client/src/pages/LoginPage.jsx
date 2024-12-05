import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/adminContext";

function LoginPage() {
	const navigate = useNavigate();
	const { login } = useAdminContext();
	const inputRef = useRef(null);

	const attemptLogin = async () => {
		const response = await login(inputRef.current.value);

		if (response) {
			navigate("/admin");
		}
	};

	return (
		<div className="loginPage">
			<input type="text" className="loginPage__input" ref={inputRef} />
			<button className="loginPage__button" onClick={attemptLogin} />
		</div>
	);
}

export default LoginPage;
