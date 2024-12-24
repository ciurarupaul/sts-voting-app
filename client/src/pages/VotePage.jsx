import { InfoSvg } from "../assets/svgs.jsx";
import { usePlayContext } from "../context/playContext.jsx";
import { useUserContext } from "../context/userContext.jsx";
import { useVoteContext } from "../context/voteContext.jsx";
import Modal from "../ui/Modal.jsx";
import VoteInfoModal from "../ui/modals/VoteInfoModal.jsx";
import truncateText from "../utils/truncateText.js";
import FallbackPage from "./FallbackPage.jsx";

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
				{/* <img
					src={activePlay.image}
					alt={`Imagine de prezentare pentru piesa ${activePlay.title}`}
					className="votePage__presentation-image"
				/> */}
				<img
					src={"/knockout.webp"}
					alt={`Imagine de prezentare pentru piesa ${activePlay.title}`}
					className="votePage__presentation-image"
				/>
				<div className="votePage__presentation-title">
					{activePlay.title}
				</div>
				<div className="votePage__presentation-description">
					{truncateText(activePlay.description, 450)}
					...
					<a
						className="votePage__presentation-description-redirect"
						onClick={(e) => {
							e.preventDefault();
							window.open(activePlay.link, "_blank");
						}}
					>
						{" "}
						See more
					</a>
				</div>
			</div>

			{/* voting section */}
			<Modal>
				<div className="votePage__vote">
					{isAllowedToVote ? (
						<div className="votePage__vote-title">Votează</div>
					) : (
						<div className="votePage__vote-title">
							Vot deja înregistrat{" "}
							<Modal.Open opens="voteInfoModal">
								<button className="svgTriggerToOpenModal">
									<InfoSvg />
								</button>
							</Modal.Open>
							<Modal.Window name="voteInfoModal">
								<VoteInfoModal
									isAllowedToVote={isAllowedToVote}
								/>
							</Modal.Window>
						</div>
					)}

					<div className="votePage__vote-btns">
						<button
							onClick={() => {
								if (isAllowedToVote) handleCastVote("DA");
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
			</Modal>
		</div>
	);
}

export default VotePage;
