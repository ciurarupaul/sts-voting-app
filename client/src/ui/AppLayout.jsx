import { usePlayContext } from "../context/playContext";
import FallbackPage from "../pages/FallbackPage";
import VotePage from "../pages/VotePage";

function AppLayout() {
	const { playState } = usePlayContext();

	const play = playState.currentPlay;
	console.log("playState received:", play);

	return (
		<div id="container">
			<img src="/sigla.png" className="footer" alt="Logo" />
			{playState.currentPlay ? <VotePage /> : <FallbackPage />}
		</div>
	);
}

export default AppLayout;
