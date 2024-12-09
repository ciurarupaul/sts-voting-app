import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentPlay } from "../../api/apiPlay";
import { Loader } from "../ui/Loader";

// returns currentPlayId, the id of the play with an active voting session

const PlayContext = createContext();

const PlayProvider = ({ children }) => {
	const [currentPlayId, setCurrentPlayId] = useState(1);
	const [currentPlay, setCurrentPlay] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	// trigger by switch in admin panel

	useEffect(() => {
		const getPlay = async () => {
			setIsLoading(true);

			try {
				const result = await getCurrentPlay(currentPlayId);
				setCurrentPlay(result || {});
				console.log(result);
			} catch (error) {
				console.error("Error fetching play in PlayContext:", error);
			} finally {
				setIsLoading(false);
			}
		};

		getPlay();
	}, [currentPlayId]);

	return (
		<PlayContext.Provider value={currentPlay}>
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
