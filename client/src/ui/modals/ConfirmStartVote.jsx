function ConfirmStartVote({ onCloseModal, handleConfirm, play }) {
	return (
		<div className="confirmStartVoteModal">
			<p className="confirmStartVoteModal__text">
				Vrei să începi sesiunea de votare pentru piesa{" "}
				<span>„{play.title}”</span>?
			</p>
			<div className="confirmStartVoteModal__btns">
				<button
					onClick={handleConfirm}
					className="confirmStartVoteModal__btn confirmStartVoteModal__btn--ok"
				>
					Ok
				</button>
				<button
					onClick={onCloseModal}
					className="confirmStartVoteModal__btn confirmStartVoteModal__btn--cancel"
				>
					Anulează
				</button>
			</div>
		</div>
	);
}

export default ConfirmStartVote;
