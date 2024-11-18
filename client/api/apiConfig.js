import axios from "axios";

const apiConfig = axios.create({
	baseURL:
		import.meta.env.MODE === "development"
			? "http://localhost:3000/api"
			: import.meta.env.VITE_SERVER_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true, // send cookies with every request
});

apiConfig.interceptors.response.use(
	(response) => response,
	(error) => {
		let message = "Something went wrong.";

		if (!error.response) {
			message = "Network error. Please check your connection.";
		} else {
			const { status, data } = error.response;
			switch (status) {
				case 400:
					message = data?.message || "Invalid request data.";
					break;
				case 401:
					message = "Session expired. Please log in again.";
					break;
				case 403:
					message = "You are not authorized to perform this action.";
					break;
				case 404:
					message = "Requested resource not found.";
					break;
				case 500:
					message = "Server error. Please try again later.";
					break;
				default:
					message = data?.message || "Unexpected error occurred.";
			}
		}
		return Promise.reject(error);
	}
);

export default apiConfig;
