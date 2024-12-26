import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
	const navigate = useNavigate();

	return (
		<section className="errorPage">
			<img
				src="/favicon.png"
				className="errorPage__logo"
				alt="Logo Serile Teatrului Studențesc"
				loading="lazy"
			/>

			<h1>Oops, ceva nu a mers bine...</h1>
			<button
				className="errorPage__btn"
				onClick={() => {
					navigate("/");
				}}
			>
				Înapoi la pagina principală
			</button>
		</section>
	);
}
