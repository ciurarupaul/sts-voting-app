import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminProvider } from "./context/adminContext.jsx";
import { PlayProvider } from "./context/playContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { VoteProvider } from "./context/voteContext.jsx";
import { Loader } from "./ui/Loader.jsx";

import VotePage from "./pages/VotePage.jsx";
import AppLayout from "./ui/AppLayout.jsx";

// lazy loaded components
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.jsx"));

function DynamicContextProvider({ children }) {
	if (location.pathname === "/") {
		return <VoteProvider>{children}</VoteProvider>;
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
		<UserProvider>
			<PlayProvider>
				<DynamicContextProvider>
					<Suspense fallback={<Loader />}>
						<AppRoutes />
					</Suspense>
				</DynamicContextProvider>
			</PlayProvider>
		</UserProvider>
	);
}

// *********************************************
// possible improvements
//     protect db from accidental seeding (which results in purging the db)
//     (save votes somewhere somehow)
//
// ---------------------------------------------
// fix incognito voting
//     user shouldnt be able to access the app in incognito mode
//           storage limitation for chromium-based browsers (opera, edge, brave, chrome): check fs, localStorage, sessionStorage
//           indexedDb (for safari and firefox, completely blocked)
//
// ---------------------------------------------
// force reload all pages when the activePlay changes (somehow)
//
// *********************************************
