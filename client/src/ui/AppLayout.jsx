import { Outlet } from "react-router-dom";

function AppLayout() {
	return (
		<div id="container">
			<img src="/sigla.png" className="footer" />
			<Outlet />
		</div>
	);
}

export default AppLayout;
