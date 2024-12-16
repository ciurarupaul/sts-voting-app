import { useEffect, useState } from "react";
import { getAllPlays, getVoteResultsForPlay } from "../../api/apiPlay";
import { Loader } from "./Loader";

function Results() {
	const [plays, setPlays] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPlaysWithVotes = async () => {
			setIsLoading(true);

			try {
				const plays = await getAllPlays();

				if (!plays) {
					console.log("No plays found");
					setIsLoading(false);
					return;
				}

				// get votes for each play
				const playsWithVotes = await Promise.all(
					plays.map(async (play) => {
						const votes = await getVoteResultsForPlay(play.playId);
						return { ...play, votes }; // merge data
					})
				);

				setPlays(playsWithVotes);
				setIsLoading(false);
			} catch (error) {
				console.log("Error getting plays: ", error);
				setIsLoading(false);
			}
		};

		fetchPlaysWithVotes();
	}, []);

	if (isLoading) return <Loader />;

	return (
		<div className="results page-container">
			<div className="results__header">
				<div className="results__header-option">DA</div>
				<div className="results__header-option">NU</div>
			</div>
			<ul className="results__table">
				{plays.map((play) => (
					<li key={play.playId} className="results__row">
						<div className="results__row-title">{play.title}</div>
						<div className="results__row-votes">
							<span>{play.votes.DA || 0}</span>
							<span>{play.votes.NU || 0}</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Results;
