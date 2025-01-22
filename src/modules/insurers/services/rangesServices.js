import { AxiosClient } from "../../../utils/axiosClient.js";
import { handleAxiosError } from "../../../utils/axiosError.js";

export const getInsurabilityRangesService = async (insurerId) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.get(`/insurability-ranges/${insurerId}`);

		if (!response.data)
			throw new Error("Failed to fetch insurability ranges. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const addInsurabilityRangeService = async (data) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.post("/insurability-ranges", data);

		if (!response.data)
			throw new Error("Failed to add insurability range. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const updateInsurabilityRangeService = async (data) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.put("/insurability-ranges", data);

		if (!response.data)
			throw new Error("Failed to update insurability range. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
}