import { AxiosClient } from "../../../utils/axiosClient.js";
import { handleAxiosError } from "../../../utils/axiosError.js";

export const getInsurersService = async () => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.get("/insurers");

		if (!response.data)
			throw new Error("Failed to fetch insures. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const getInsurerService = async (insurerId) => {
	try {
		const axiosClient = AxiosClient();
		console.log("insurerId", insurerId);
		const response = await axiosClient.get(`/insurers/${insurerId}`);

		if (!response.data)
			throw new Error("Failed to fetch insure. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const addInsurerService = async (data) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.post("/insurers", data);

		if (!response.data)
			throw new Error("Failed to add insure. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};
