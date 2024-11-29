import { usePlayContext } from "../context/playContext";
import FallbackPage from "../pages/FallbackPage";
import VotePage from "../pages/VotePage";

function AppLayout() {
	const { playState } = usePlayContext();

	const play = playState.currentPlay;
	console.log("Searched db. Current play:", play?.title);

	return (
		<div id="container">
			<img src="/logo.png" className="footer" alt="Logo" />
			{playState.currentPlay ? <VotePage /> : <FallbackPage />}
		</div>
	);
}

export default AppLayout;
