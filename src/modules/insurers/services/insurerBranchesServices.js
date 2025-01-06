import { AxiosClient } from "../../../utils/axiosClient";

export const getInsurerBranchesService = async (insurerId) => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.get(`/branches/${insurerId}`);

        if (!response.data)
            throw new Error("Failed to fetch insures. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

export const addInsurerBranchService = async (data) => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.post("/branches", data);

        if (!response.data)
            throw new Error("Failed to add branch. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
}