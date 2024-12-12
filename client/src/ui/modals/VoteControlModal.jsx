import { useState } from "react";

function VoteControlModal({
	onCloseModal,
	play,
	handleConfirm,
	selectedPlayId,
}) {
	return (
		<div className="voteControlModal">
			{selectedPlayId === null ? (
				<div className="voteControlModal__text">
					Începi sesiunea de vot pentru
					<span> {play.title}</span>?
				</div>
			) : selectedPlayId === play.playId ? (
				<div className="voteControlModal__text">
					Oprești sesiunea de vot pentru
					<span> {play.title}</span>?
				</div>
			) : (
				<div className="voteControlModal__text">
					<p>O altă sesiune de vot este în desfășuare!</p> <br />
					Începerea sesiunii de vot pentru <span>
						{" "}
						{play.title}
					</span>{" "}
					o va opri pe cea curentă. Vrei să continui?
				</div>
			)}

			<div className="voteControlModal__btns">
				<button
					onClick={() => handleConfirm(play.playId)}
					className="voteControlModal__btn voteControlModal__btn--ok"
				>
					Confirmă
				</button>
				<button
					onClick={onCloseModal}
					className="voteControlModal__btn voteControlModal__btn--cancel"
				>
					Anulează
				</button>
			</div>
		</div>
	);
}

export default VoteControlModal;
