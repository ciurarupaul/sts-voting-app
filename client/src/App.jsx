import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminProvider } from "./context/adminContext.jsx";
import { PlayProvider } from "./context/playContext.jsx";
import { VoteProvider } from "./context/voteContext.jsx";
import { Loader } from "./ui/Loader.jsx";

import FallbackPage from "./pages/FallbackPage.jsx";
import VotePage from "./pages/VotePage.jsx";
import AppLayout from "./ui/AppLayout.jsx";

// lazy loaded components
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.jsx"));

function DynamicContextProvider({ children }) {
	if (location.pathname === "/") {
		return (
			<PlayProvider>
				<VoteProvider>{children}</VoteProvider>
			</PlayProvider>
		);
	}

	if (["/login", "/admin"].includes(location.pathname)) {
		return <AdminProvider>{children}</AdminProvider>;
	}

	return <>{children}</>;
}

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<VotePage />} />
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
		<DynamicContextProvider>
			<Suspense fallback={<Loader />}>
				<AppRoutes />
			</Suspense>
		</DynamicContextProvider>
	);
}
