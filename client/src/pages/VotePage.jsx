import { useAuthContext } from "../context/authContext.jsx";
import { usePlayContext } from "../context/playContext.jsx";
import truncateText from "../utils/truncateText.js";
import { GoInfo } from "react-icons/go";

function VotePage() {
	const { authState, castVoteInContext } = useAuthContext();
	const { playState } = usePlayContext();
	console.log(playState);

	const play = playState.currentPlay;
	console.log(play);

	async function handleCastVote(option) {
		try {
			await castVoteInContext(option);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="content-container votePage__container">
			<div className="votePage__presentation">
				{/* play presentation */}
				<img
					src={play.image}
					className="votePage__presentation-image"
				/>
				<div className="votePage__presentation-title">{play.title}</div>
				{/* will later calc the num of words based on device height -- somehow */}
				<div className="votePage__presentation-description">
					{truncateText(play.description, 300)}
					...
					{/* <a
						className="votePage__presentation-description-redirect"
						onClick={() => window.open(play.stsLink, "_blank")}
					>
						{" "}
						See more
					</a> */}
				</div>
			</div>

			{/* voting section */}
			<div className="votePage__vote">
				{authState.isAllowedToVote ? (
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
						disabled={!authState.isAllowedToVote}
					>
						DA
					</button>
					<button
						onClick={() => {
							handleCastVote("NU");
						}}
						disabled={!authState.isAllowedToVote}
					>
						NU
					</button>
				</div>
			</div>
		</div>
	);
}

export default VotePage;
