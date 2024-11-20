import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentPlay } from "../../api/apiPlay";
import { Loader } from "../ui/Loader";

const PlayContext = createContext();

const PlayProvider = ({ children }) => {
	const [playState, setPlayState] = useState({
		currentPlay: null,
		isLoading: true,
	});

	useEffect(() => {
		const fetchCurrentPlay = async () => {
			try {
				const play = await getCurrentPlay();

				setPlayState({
					currentPlay: play,
					isLoading: false,
				});
			} catch (error) {
				console.log("Error fetching current play: ", error);
				setPlayState({
					currentPlay: null,
					isLoading: false,
				});
			}
		};

		fetchCurrentPlay();
	}, []);

	return (
		<PlayContext.Provider value={{ playState }}>
			{playState.isLoading ? <Loader /> : children}
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
