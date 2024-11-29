import { useNavigate } from "react-router-dom";

export default function ErrorPage(err) {
	const navigate = useNavigate();
	return (
		<div className="errorPage">
			<img src="/favicon.png" className="errorPage__logo" />

			<p>Oops, ceva nu a mers bine...</p>
			<button
				className="errorPage__btn"
				onClick={() => {
					navigate("/");
				}}
			>
				Înapoi la pagina principală
			</button>
		</div>
	);
}
