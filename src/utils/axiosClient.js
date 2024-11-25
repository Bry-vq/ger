import axios from "axios";

const AxiosClient = () => {
	return axios.create({
		baseURL: `${import.meta.env.VITE_API_ROOT}`,
	});
};

const requestHeaderMaker = (token) => {
	return {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
};

export { AxiosClient, requestHeaderMaker };
