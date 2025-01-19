import { AxiosClient } from "../../../utils/axiosClient.js";

export const getEmployeesService = async () => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.get("/employees");

		if (!response.data)
			throw new Error("Failed to fetch employees. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const getEmployeesSelectService = async () => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.get("/employees/select");

		if (!response.data)
			throw new Error("Failed to fetch employees select. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};

export const addEmployeeService = async (data) => {
	try {
		const axiosClient = AxiosClient();
		const response = await axiosClient.post("/employees", data);

		if (!response.data)
			throw new Error("Failed to add employee. No response data.");

		return response.data;
	} catch (error) {
		throw new Error(handleAxiosError(error));
	}
};
