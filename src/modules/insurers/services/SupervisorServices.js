import { AxiosClient, requestHeaderMaker } from "../../../utils/axiosClient.js";
import { handleAxiosError } from "../../../utils/axiosError.js";

export const getSupervisorsService = async (branchId) => {
    try {
        const axiosClient = AxiosClient();
        const requestHeaders = requestHeaderMaker();
        const response = await axiosClient.get(`/supervisors/${branchId}`, requestHeaders);

        if (!response.data)
            throw new Error("Failed to fetch supervisors. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const addSupervisorService = async (data, token = null) => {
    try {
        const axiosClient = AxiosClient();
        const requestHeaders = requestHeaderMaker(token);
        const response = await axiosClient.post("/supervisors", data, requestHeaders);

        if (!response.data)
            throw new Error("Failed to add supervisor. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
}