import { AxiosClient, requestHeaderMaker } from "../../../utils/axiosClient.js";
import { handleAxiosError } from "../../../utils/axiosError.js";

export const getInsurersService = async () => {
	try {
		const axiosClient = AxiosClient();
		const requestHeaders = requestHeaderMaker();
		const response = await axiosClient.get("/insurers", requestHeaders);

		if (!response.data)
			throw new Error("Failed to fetch insurers. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const getInsurerService = async (insurerId) => {
	try {
		const axiosClient = AxiosClient();
		const requestHeaders = requestHeaderMaker();
		const response = await axiosClient.get(`/insurers/${insurerId}`, requestHeaders);

		if (!response.data)
			throw new Error("Failed to fetch insurer. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const getInsurersSelectService = async () => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.get("/insurers/select");

        if (!response.data)
            throw new Error("Failed to fetch inspections select. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
}

export const addInsurerService = async (data, token = null) => {
	try {
		const axiosClient = AxiosClient();
		const requestHeaders = requestHeaderMaker(token);
		const response = await axiosClient.post("/insurers", data, requestHeaders);

		if (!response.data)
			throw new Error("Failed to add insurer. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};
