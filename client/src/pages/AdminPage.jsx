import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/adminContext";
import { Loader } from "../ui/Loader";

function AdminPage() {
	const navigate = useNavigate();
	const { adminState } = useAdminContext();
	const [isLoading, setIsLoading] = useState(true);

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

	return <div>admin page</div>;
}

export default AdminPage;
