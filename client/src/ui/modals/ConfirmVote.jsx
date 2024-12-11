function ConfirmVote({ onCloseModal, handleConfirm, play }) {
	return (
		<div>
			<p>Are you sure you want to start voting for "{play?.title}"?</p>
			<div>
				<button onClick={handleConfirm}>OK</button>
				<button onClick={onCloseModal}>Cancel</button>
			</div>
		</div>
	);
}

export default ConfirmVote;
