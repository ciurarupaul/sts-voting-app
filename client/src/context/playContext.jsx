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
				console.log("execute playContext");
				const play = await getCurrentPlay();

				console.log("current play: ", play.title);
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

		const waitForNextMinute = () => {
			const now = new Date();
			const msUntilNextMinute =
				(60 - now.getSeconds()) * 1000 - now.getMilliseconds();

			setTimeout(() => {
				fetchCurrentPlay();
				setInterval(fetchCurrentPlay, 60000);
			}, msUntilNextMinute);
		};

		fetchCurrentPlay();
		waitForNextMinute();

		return () => clearInterval();
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
