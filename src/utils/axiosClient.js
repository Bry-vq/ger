import axios from "axios";

const AxiosClient = () => {
	return axios.create({
		baseURL: `${import.meta.env.VITE_API_ROOT}api`,
	});
};

const requestHeaderMaker = (token = null) => {
	const headers = {
		"Content-Type": "application/json",
		"Accept": "application/json",
	};
	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}
	return { headers };
};

export { AxiosClient, requestHeaderMaker };
