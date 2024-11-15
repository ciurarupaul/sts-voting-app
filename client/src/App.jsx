import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import VotePage from "./pages/VotePage";

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					errorElement={<ErrorPage />}
					element={<AppLayout />}
				>
					<Route index element={<VotePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default function App() {
	return <AppRoutes />;
}
