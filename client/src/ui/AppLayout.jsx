import { Outlet } from "react-router-dom";

function AppLayout() {
	return (
		<div className="container">
			<img src="/logo.png" className="logo" alt="Logo" />
			<Outlet />
		</div>
	);
}

export default AppLayout;
