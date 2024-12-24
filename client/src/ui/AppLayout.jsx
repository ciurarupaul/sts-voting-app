import { Outlet, useNavigate } from "react-router-dom";

function AppLayout() {
	const navigate = useNavigate();
	return (
		<div className="container">
			<img
				src="/logo.png"
				className="logo"
				alt="Logo"
				onClick={() => navigate("/")}
			/>
			<Outlet />
		</div>
	);
}

export default AppLayout;
