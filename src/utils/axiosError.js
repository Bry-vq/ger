import { AxiosError } from "axios";

export const handleAxiosError = (error) => {
	if (error instanceof AxiosError) {
		// Extract the server error message
		const serverErrorMessage = error.response?.data
			?.message;
		if (serverErrorMessage) {
			return serverErrorMessage;
		}

		// If there's no specific server error message, check for generic status
		return error.response?.statusText || "An unknown server error occurred.";
	}

	// Handle any other non-Axios errors (e.g., unexpected errors, client errors)
	return error instanceof Error
		? error.message
		: "An unexpected error occurred.";
};
