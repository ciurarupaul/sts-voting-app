import { useEffect, useState } from "react";
import { getAllPlays } from "../../api/apiPlay";
import { usePlayContext } from "../context/playContext";
import { Loader } from "./Loader";
import Modal from "./Modal";
import VoteControlModal from "./modals/VoteControlModal";

function VoteControl() {
	const [plays, setPlays] = useState([]);
	const [selectedPlayId, setSelectedPlayId] = useState(null);
	const { updateCurrentPlay, activePlayId } = usePlayContext();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getPlays = async () => {
			setIsLoading(true);

			try {
				setSelectedPlayId(activePlayId || null);
				const plays = await getAllPlays();

				if (!plays) {
					console.log("no plays found");
					setIsLoading(false);
					return;
				}

				setPlays(plays);
				setIsLoading(false);
			} catch (error) {
				console.log("Error getting plays: ", error);
				setIsLoading(false);
			}
		};

		getPlays();
	}, [activePlayId, selectedPlayId]);

	if (isLoading) return <Loader />;

	const handleConfirmStart = async (playId) => {
		// udpates context and reloades component because of useEffect dependency
		await updateCurrentPlay(playId);
	};

	const handleConfirmStop = async () => {
		await updateCurrentPlay(null);
	};

	const handleConfirmOverride = async (newPlayId) => {
		await updateCurrentPlay(newPlayId);
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
							{selectedPlayId === null ? (
								// if there is no active play, start
								<Modal.Open
									opens={`confirmStart--${play.playId}`}
								>
									<button className="voteControl__row-button">
										Start vot
									</button>
								</Modal.Open>
							) : selectedPlayId !== play.playId ? (
								// override current active play (close the current one and set a new one as active)
								<Modal.Open
									opens={`confirmOverride--${play.playId}`}
								>
									<button className="voteControl__row-button">
										Start vot
									</button>
								</Modal.Open>
							) : (
								// stop all active plays, set to null
								<Modal.Open
									opens={`confirmStop--${play.playId}`}
								>
									<button className="voteControl__row-button">
										Stop vot
									</button>
								</Modal.Open>
							)}
						</div>

						<Modal.Window name={`confirmStart--${play.playId}`}>
							<VoteControlModal
								handleConfirm={handleConfirmStart}
								play={play}
								selectedPlayId={selectedPlayId}
							/>
						</Modal.Window>

						<Modal.Window name={`confirmStop--${play.playId}`}>
							<VoteControlModal
								play={play}
								handleConfirm={handleConfirmStop}
								selectedPlayId={selectedPlayId}
							/>
						</Modal.Window>

						<Modal.Window name={`confirmOverride--${play.playId}`}>
							<VoteControlModal
								play={play}
								handleConfirm={handleConfirmOverride}
								selectedPlayId={selectedPlayId}
							/>
						</Modal.Window>
					</div>
				))}
			</div>
		</Modal>
	);
}

export default VoteControl;
