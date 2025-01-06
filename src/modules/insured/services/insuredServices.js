import { AxiosClient } from "../../../utils/axiosClient.js";

export const getInsuredsService = async () => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.get("/insureds");

        if (!response.data)
            throw new Error("Failed to fetch insureds. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
}

export const addInsuredService = async (data) => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.post("/insureds", data);

        if (!response.data)
            throw new Error("Failed to add insured. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
}