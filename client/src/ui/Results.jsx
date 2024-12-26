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
		<section className="results page-container">
			<header className="results__header">
				<div className="results__header-option">DA</div>
				<div className="results__header-option">NU</div>
			</header>
			<ul className="results__table">
				{plays.map((play) => (
					<li key={play.playId} className="results__row">
						<h3 className="results__row-title">{play.title}</h3>
						<div className="results__row-votes">
							<span>{play.votes.DA || 0}</span>
							<span>{play.votes.NU || 0}</span>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}

export default Results;
