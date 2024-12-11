import { GoInfo } from "react-icons/go";
import { usePlayContext } from "../context/playContext.jsx";
import { useUserContext } from "../context/userContext.jsx";
import { useVoteContext } from "../context/voteContext.jsx";
import truncateText from "../utils/truncateText.js";
import FallbackPage from "./FallbackPage.jsx";

function VotePage() {
	const { isAllowedToVote, castVoteInContext } = useVoteContext();
	const anonId = useUserContext();
	const currentPlay = usePlayContext();
	const playId = currentPlay?.playId;

	async function handleCastVote(voteOption) {
		try {
			await castVoteInContext(anonId, voteOption, playId);
		} catch (error) {
			console.log(error);
		}
	}

	if (!currentPlay) return <FallbackPage />;

	return (
		<div className="page-container votePage">
			<div className="votePage__presentation">
				{/* play presentation */}
				<img
					src={currentPlay.image}
					className="votePage__presentation-image"
				/>
				<div className="votePage__presentation-title">
					{currentPlay.title}
				</div>
				<div className="votePage__presentation-description">
					{truncateText(currentPlay.description, 400)}
					...
					<a
						className="votePage__presentation-description-redirect"
						onClick={() => window.open(currentPlay.link, "_blank")}
					>
						{" "}
						See more
					</a>
				</div>
			</div>

			{/* voting section */}
			<div className="votePage__vote">
				{isAllowedToVote ? (
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
						disabled={!isAllowedToVote}
					>
						DA
					</button>
					<button
						onClick={() => {
							handleCastVote("NU");
						}}
						disabled={!isAllowedToVote}
					>
						NU
					</button>
				</div>
			</div>
		</div>
	);
}

export default VotePage;
