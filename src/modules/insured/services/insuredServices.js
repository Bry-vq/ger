import { AxiosClient } from "../../../utils/axiosClient.js";
import { handleAxiosError } from "../../../utils/axiosError.js";

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

export const getInsuredsSelectService = async () => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.get("/insureds/select");

        if (!response.data)
            throw new Error("Failed to fetch insureds select. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
}

export const getInsuredService = async (insuredId) => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.get(`/insureds/${insuredId}`);

        if (!response.data)
            throw new Error("Failed to fetch insured. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
}

export const getInsuredBranchesService = async (insuredId) => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.get(`/insured-branches/${insuredId}`);

        if (!response.data)
            throw new Error("Failed to fetch insured branches. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
}

export const getInsuredBranchesSelectService = async (insuredId) => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.get(`/insured-branches/${insuredId}/select`);

        if (!response.data)
            throw new Error("Failed to fetch insured branches select. No response data.");

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

export const addInsuredBranchService = async (data) => {
    try {
        const axiosClient = AxiosClient();
        const response = await axiosClient.post("/insured-branches", data);

        if (!response.data)
            throw new Error("Failed to add insured branch. No response data.");

        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
}
