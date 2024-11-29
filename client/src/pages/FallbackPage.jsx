export default function ErrorPage() {
	console.log("loaded fallback page");
	return (
		<div className="content-container fallback">
			<div className="fallback__title">
				Momentan nu există sesiuni de vot active
			</div>
			<div className="fallback__text">
				Află mai multe pe{" "}
				<a
					className="fallback__link"
					onClick={() =>
						window.open("https://sts.sisc.ro/index.html", "_blank")
					}
				>
					sts.sisc.ro
				</a>
			</div>
		</div>
	);
}
