import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/adminContext";
import { useEffect, useState } from "react";
import { Loader } from "../ui/Loader";

function AdminPage() {
	const adminState = useAdminContext();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!adminState.isLoggedIn || !adminState.token) {
			navigate("/login");
		}

		setIsLoading(false);
	}, [adminState.isLoggedIn, adminState.token, navigate]);

	if (isLoading) return <Loader />;

	return <div>admin page</div>;
}

export default AdminPage;
