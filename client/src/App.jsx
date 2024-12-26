import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PlayProvider } from "./context/playContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { Loader } from "./ui/Loader.jsx";

import VotePage from "./pages/VotePage.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import { VoteProvider } from "./context/voteContext.jsx";
import { AdminProvider } from "./context/adminContext.jsx";

// lazy loaded components
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.jsx"));

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
		<UserProvider>
			<PlayProvider>
				<VoteProvider>
					<AdminProvider>
						<Suspense fallback={<Loader />}>
							<AppRoutes />
						</Suspense>
					</AdminProvider>
				</VoteProvider>
			</PlayProvider>
		</UserProvider>
	);
}
