import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/adminContext";
import { Loader } from "../ui/Loader";
import VoteSessionControl from "../ui/VoteControl";
import Results from "../ui/Results";

function AdminPage() {
	const navigate = useNavigate();
	const { adminState } = useAdminContext();
	const [isLoading, setIsLoading] = useState(true);

	const [isVotePanel, setIsVotePanel] = useState(true);

	useEffect(() => {
		if (adminState.isLoading) {
			setIsLoading(true);
			return;
		}

		setIsLoading(false);

		if (!adminState.isLoggedIn || !adminState.token) {
			navigate("/login");
		}
	}, [adminState, navigate]);

	if (isLoading) return <Loader />;

	return (
		<div className="page-container adminPage">
			<div className="adminPage__btns">
				<button
					className={`${
						isVotePanel ? "adminPage__btns__btn--left--active" : ""
					} adminPage__btns__btn--left`}
					onClick={() => {
						setIsVotePanel(true);
					}}
				>
					Vot
				</button>
				<button
					className={`${
						!isVotePanel
							? "adminPage__btns__btn--right--active"
							: ""
					} adminPage__btns__btn--right`}
					onClick={() => {
						setIsVotePanel(false);
					}}
				>
					Rezultate
				</button>
			</div>

			<div className="adminPage__content">
				{isVotePanel ? <VoteSessionControl /> : <Results />}
			</div>
		</div>
	);
}

export default AdminPage;
