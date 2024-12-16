function VoteInfoModal({ onCloseModal }) {
	return (
		<>
			<div className="voteInfo__text">
				Votul tău a fost înregistrat cu succes. Conform regulamentului,
				fiecare utilizator poate vota o singură dată pentru fiecare
				piesă.
			</div>

			<div className="voteControlModal__btns">
				<button
					onClick={onCloseModal}
					className="voteControlModal__btn"
				>
					Am înțeles
				</button>
			</div>
		</>
	);
}

export default VoteInfoModal;
