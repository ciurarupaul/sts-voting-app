export function Loader({ children }) {
	return (
		<div className="loader loader--only">
			<div className="loader-spinner" />
			<div className="loader-text">Loading...</div>
		</div>
	);
}
