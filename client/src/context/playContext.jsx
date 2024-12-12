import { createContext, useContext, useEffect, useState } from "react";
import {
	getActivePlayData,
	getActivePlayId,
	updateActivePlayId,
} from "../../api/apiPlay";
import { Loader } from "../ui/Loader";

const PlayContext = createContext();

const PlayProvider = ({ children }) => {
	const [activePlayId, setActivePlayId] = useState(null);
	const [activePlay, setActivePlay] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getPlay = async () => {
			setIsLoading(true);

			try {
				// fetch id from db
				const fetchedPlayId = await getActivePlayId();
				setActivePlayId(fetchedPlayId);

				if (activePlay && activePlay.playId !== activePlayId) {
					// fetch play data
					const fetchedPlayData = await getActivePlayData(
						activePlayId
					);
					setActivePlay(fetchedPlayData);
				}
			} catch (error) {
				console.log("Error fetching play in PlayContext:", error);
			} finally {
				setIsLoading(false);
			}
		};

		getPlay();
	}, [activePlayId]);

	const updateCurrentPlay = async (playId) => {
		await updateActivePlayId(playId);
		setActivePlayId(playId);
	};

	return (
		<PlayContext.Provider
			value={{ activePlayId, activePlay, updateCurrentPlay }}
		>
			{isLoading ? <Loader /> : children}
		</PlayContext.Provider>
	);
};

function usePlayContext() {
	const context = useContext(PlayContext);

	if (context === undefined) {
		console.log(
			"usePlayContext was used outside its scope. It must be used inside PlayProvider!"
		);
	}

	return context;
}

export { PlayProvider, usePlayContext };
