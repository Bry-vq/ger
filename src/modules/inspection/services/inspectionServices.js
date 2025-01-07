import { AxiosClient } from "../../../utils/axiosClient.js";

export const getInspectionsService = async () => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.get("/inspections");

        if (!response.data)
            throw new Error("Failed to fetch inspections. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
}

export const addInspectionService = async (data) => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.post("/inspections", data);

        if (!response.data)
            throw new Error("Failed to add inspection. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
}
