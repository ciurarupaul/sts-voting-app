import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { PlayProvider, usePlayContext } from "./context/playContext.jsx";
import { Loader } from "./ui/Loader.jsx";

import FallbackPage from "./pages/FallbackPage.jsx";
import VotePage from "./pages/VotePage.jsx";
import AppLayout from "./ui/AppLayout.jsx";

// lazy loaded components
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.jsx"));

function AppRoutes() {
	const { playState } = usePlayContext();

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route
						index
						element={
							playState.currentPlay ? (
								<VotePage />
							) : (
								<FallbackPage />
							)
						}
					/>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/admin" element={<AdminPage />} />
				</Route>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default function App() {
	return (
		<PlayProvider>
			<AuthProvider>
				<Suspense fallback={<Loader />}>
					<AppRoutes />
				</Suspense>
			</AuthProvider>
		</PlayProvider>
	);
}
