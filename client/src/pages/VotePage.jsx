import { useVoteContext } from "../context/voteContext.jsx";
import { usePlayContext } from "../context/playContext.jsx";
import truncateText from "../utils/truncateText.js";
import { GoInfo } from "react-icons/go";
import FallbackPage from "./FallbackPage.jsx";

function VotePage() {
	const { voteState, castVoteInContext } = useVoteContext();
	const { playState } = usePlayContext();

	const play = playState.currentPlay;

	async function handleCastVote(option) {
		try {
			await castVoteInContext(option);
		} catch (err) {
			console.error(err);
		}
	}

	if (!play) return <FallbackPage />;

	return (
		<div className="content-container votePage">
			<div className="votePage__presentation">
				{/* play presentation */}
				<img
					src={play.image}
					className="votePage__presentation-image"
				/>
				<div className="votePage__presentation-title">{play.title}</div>
				<div className="votePage__presentation-description">
					{truncateText(play.description, 400)}
					...
					<a
						className="votePage__presentation-description-redirect"
						onClick={() => window.open(play.link, "_blank")}
					>
						{" "}
						See more
					</a>
				</div>
			</div>

			{/* voting section */}
			<div className="votePage__vote">
				{voteState.isAllowedToVote ? (
					<div className="votePage__vote-title">
						Votează <GoInfo />
						{/* will add info modal here */}
					</div>
				) : (
					<div className="votePage__vote-title">
						Vot deja înregistrat <GoInfo />
					</div>
				)}
				<div className="votePage__vote-btns">
					<button
						onClick={() => {
							handleCastVote("DA");
						}}
						disabled={!voteState.isAllowedToVote}
					>
						DA
					</button>
					<button
						onClick={() => {
							handleCastVote("NU");
						}}
						disabled={!voteState.isAllowedToVote}
					>
						NU
					</button>
				</div>
			</div>
		</div>
	);
}

export default VotePage;
