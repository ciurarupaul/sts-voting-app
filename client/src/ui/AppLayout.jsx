import { Outlet } from "react-router-dom";

function AppLayout() {
	return (
		<div id="container">
			<img src="/logo.png" className="logo" alt="Logo" />
			<Outlet />
		</div>
	);
}

export default AppLayout;
