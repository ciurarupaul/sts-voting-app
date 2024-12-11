import { useEffect, useState } from "react";
import { getAllPlays } from "../../api/apiPlay";
import Modal from "./Modal";
import ConfirmStartVote from "./modals/ConfirmStartVote";

function VoteControl() {
	const [plays, setPlays] = useState([]);
	const [selectedPlayIndex, setSelectedPlayIndex] = useState(null);

	useEffect(() => {
		const getPlays = async () => {
			try {
				const plays = await getAllPlays();

				if (!plays) {
					console.log("no plays found");
					return;
				}

				setPlays(plays);
			} catch (error) {
				console.log("Error getting plays: ", error);
			}
		};

		getPlays();
	}, []);

	const handleConfirm = () => {
		console.log(`Voting started for play: ${selectedPlay?.title}`);
		setSelectedPlayIndex(null); // Close the modal after confirming
	};

	// see the modal file to understand it

	return (
		<Modal>
			<div className="voteControl page-container">
				{plays.map((play) => (
					<div key={play.playId} className="voteControl__table">
						<div className="voteControl__row">
							<div className="voteControl__row-title">
								{play.title}
							</div>
							<Modal.Open opens="confirmStartVote">
								<button className="voteControl__row-button">
									START VOT
								</button>
							</Modal.Open>
						</div>

						{/* 
						because of the way everything renders and with the createPortal, hte closing function onCloseModal cannot be accessed here, but inside a child component of Modal.Window, where it can be destructured */}
						<Modal.Window name="confirmStartVote">
							<ConfirmStartVote
								handleConfirm={handleConfirm}
								play={play}
							/>
						</Modal.Window>
					</div>
				))}
			</div>
		</Modal>
	);
}

export default VoteControl;
