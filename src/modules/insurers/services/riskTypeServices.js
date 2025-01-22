import { AxiosClient } from "../../../utils/axiosClient.js";
import { handleAxiosError } from "../../../utils/axiosError.js";

export const getRiskTypesService = async (insurerId) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.get(`/risk-types/${insurerId}`);

		if (!response.data)
			throw new Error("Failed to fetch risk types. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const getRiskTypesSelectService = async (insurerId) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.get(`/risk-types/${insurerId}/select`);

		if (!response.data)
			throw new Error("Failed to fetch risk types select. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
}

export const addRiskTypeService = async (data) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.post("/risk-types", data);

		if (!response.data)
			throw new Error("Failed to add risk type. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const updateRiskTypeService = async (data) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.put("/risk-types", data);

		if (!response.data)
			throw new Error("Failed to update risk type. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
}