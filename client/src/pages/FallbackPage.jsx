export default function ErrorPage() {
	return (
		<section className="fallback">
			<h1 className="fallback__title">
				Momentan nu există sesiuni de vot active
			</h1>
			<h3 className="fallback__text">
				Află mai multe pe{" "}
				<a
					className="fallback__link"
					onClick={() =>
						window.open("https://sts.sisc.ro/index.html", "_blank")
					}
				>
					sts.sisc.ro
				</a>
			</h3>
		</section>
	);
}
