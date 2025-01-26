import { AxiosClient } from "../../../utils/axiosClient.js";
import { handleAxiosError } from "../../../utils/axiosError.js";

export const getRatesService = async (insurerId) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.get(`/rates/${insurerId}`);

		if (!response.data)
			throw new Error("Failed to fetch rates. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const getRatesByRiskService = async (insurerId, riskId) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.get(`/rates/${insurerId}/risk/${riskId}/select`);

		if (!response.data)
			throw new Error("Failed to fetch rates by risk. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const addRateService = async (rate) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.post("/rates", rate);

		if (!response.data)
			throw new Error("Failed to create rate. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const updateRateService = async (rate) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.put("/rates", rate);

		if (!response.data)
			throw new Error("Failed to update rate. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
}