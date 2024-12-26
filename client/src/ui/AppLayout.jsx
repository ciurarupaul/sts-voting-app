import { Outlet, useNavigate } from "react-router-dom";

function AppLayout() {
	const navigate = useNavigate();
	return (
		<div className="container">
			<header>
				<img
					src="/logo.png"
					className="logo"
					height={"100px"}
					width={"180px"}
					loading="lazy"
					alt="Logo"
					onClick={() => navigate("/")}
				/>
			</header>
			<main className="page-container">
				<Outlet />
			</main>
		</div>
	);
}

export default AppLayout;
