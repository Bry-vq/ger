import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authServices.js";
import { queryClient } from "../../../../utils/queryClient.js";

export const useAuth = () => {
	const navigate = useNavigate();
	const [authState, setAuthState] = useState(
		!!localStorage.getItem("gesiar-token"),
	);

	const { mutateAsync: login, isLoading: isPending } = useMutation({
		mutationFn: loginService,
		onSuccess: async (userData) => {
			localStorage.setItem("gesiar-token", userData.access_token);
			setAuthState(true);
			navigate("/home");
		},
		onError: (error) => {
			console.error("Login Error:", error);
		},
	});

	const logout = () => {
		localStorage.removeItem("gesiar-token");
		queryClient().clear(); // Clear all cache from react-query
		setAuthState(false);
		navigate("/login");
	};

	useEffect(() => {
		// Listen for changes in localStorage and update authState accordingly
		const handleStorageChange = () =>
			setAuthState(!!localStorage.getItem("gesiar-token"));
		window.addEventListener("storage", handleStorageChange);

		// Clean up the event listener on component unmount
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	return {
		authState,
		login,
		isPending,
		logout,
	};
};
