import { InfoSvg } from "../assets/svgs.jsx";
import { usePlayContext } from "../context/playContext.jsx";
import { useUserContext } from "../context/userContext.jsx";
import { useVoteContext } from "../context/voteContext.jsx";
import Modal from "../ui/Modal.jsx";
import VoteInfoModal from "../ui/modals/VoteInfoModal.jsx";
import truncateText from "../utils/truncateText.js";
import FallbackPage from "./FallbackPage.jsx";

function VotePage() {
	// context data
	const { isAllowedToVote, castVoteInContext } = useVoteContext();
	const anonId = useUserContext();
	const { activePlay, activePlayId: playId } = usePlayContext();

	// handlers
	async function handleCastVote(voteOption) {
		try {
			await castVoteInContext(anonId, voteOption, playId);
		} catch (error) {
			console.log("Failed to cast vote: ", error);
		}
	}

	function handleRedirect(e) {
		e.preventDefault();
		window.open(activePlay.link, "_blank");
	}

	if (!activePlay) return <FallbackPage />;

	const truncatedDescription =
		activePlay.description && activePlay.description.length > 450
			? truncateText(activePlay.description, 450)
			: activePlay.description;

	return (
		<section className="votePage">
			{/* play presentation */}
			<div className="votePage__presentation">
				<img
					src={activePlay.image}
					alt={`Imagine de prezentare pentru piesa ${activePlay.title}`}
					className="votePage__presentation-image"
					loading="lazy"
					width={"100%"}
					height={"100%"}
				/>
				<h2 className="votePage__presentation-title">
					{activePlay.title}
				</h2>
				<p className="votePage__presentation-description">
					{truncatedDescription + "... "}
					<a
						className="votePage__presentation-description-redirect"
						onClick={handleRedirect}
						href="#"
					>
						Citește mai mult
					</a>
				</p>
			</div>

			{/* voting section */}
			<Modal>
				<div className="votePage__vote">
					{isAllowedToVote ? (
						<h2 className="votePage__vote-title">Votează</h2>
					) : (
						<h2 className="votePage__vote-title">
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
						</h2>
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
		</section>
	);
}

export default VotePage;
