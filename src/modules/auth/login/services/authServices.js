import { AxiosClient } from "../../../../utils/axiosClient.js";
import { handleAxiosError } from "../../../../utils/axiosError.js";

export const loginService = async (data) => {
    try {
        const axiosClient = AxiosClient();

        // Crear form-data para enviar username y password
        const formData = new URLSearchParams();
        formData.append("username", data.username); // Asegúrate de enviar "username" (OAuth2PasswordRequestForm espera 'username')
        formData.append("password", data.password);

        const response = await axiosClient.post("/auth/login", formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        if (!response.data)
            throw new Error("Failed to login. No response data.");

        return response.data; // Esto devuelve el access_token
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};
