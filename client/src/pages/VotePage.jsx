import { usePlayContext } from "../context/playContext.jsx";
import { useUserContext } from "../context/userContext.jsx";
import { useVoteContext } from "../context/voteContext.jsx";
import truncateText from "../utils/truncateText.js";
import FallbackPage from "./FallbackPage.jsx";
import { InfoSvg } from "../assets/svgs.jsx";

function VotePage() {
	const { isAllowedToVote, castVoteInContext } = useVoteContext();
	const anonId = useUserContext();
	const { activePlay, activePlayId: playId } = usePlayContext();

	async function handleCastVote(voteOption) {
		try {
			await castVoteInContext(anonId, voteOption, playId);
		} catch (error) {
			console.log(error);
		}
	}

	if (!activePlay) return <FallbackPage />;

	return (
		<div className="page-container votePage">
			<div className="votePage__presentation">
				{/* play presentation */}
				<img
					src={activePlay.image}
					className="votePage__presentation-image"
				/>
				<div className="votePage__presentation-title">
					{activePlay.title}
				</div>
				<div className="votePage__presentation-description">
					{truncateText(activePlay.description, 400)}
					...
					<a
						className="votePage__presentation-description-redirect"
						onClick={() => window.open(activePlay.link, "_blank")}
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
						Votează <InfoSvg />
						{/* will add info modal here */}
					</div>
				) : (
					<div className="votePage__vote-title">
						Vot deja înregistrat <InfoSvg />
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
