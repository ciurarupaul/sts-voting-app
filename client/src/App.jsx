import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { PlayProvider } from "./context/playContext.jsx";

import ErrorPage from "./pages/ErrorPage.jsx";
import AppLayout from "./ui/AppLayout.jsx";

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					errorElement={<ErrorPage />}
					element={<AppLayout />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default function App() {
	return (
		<PlayProvider>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</PlayProvider>
	);
}
