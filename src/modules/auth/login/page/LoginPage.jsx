import React from "react";
import { Container, Box, Paper, useTheme, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm.jsx";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
	const theme = useTheme();
	const { login, isPending } = useAuth();

	// Initialize react-hook-form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Function to handle form submission
	const onSubmit = async (data) => {
		try {
			console.log("data", data);
			await login(data); // Pass form data to login hook
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
			}}
		>
			<Container maxWidth="sm">
				<Paper
					elevation={6}
					sx={{ p: 4, borderTop: `12px solid ${theme.palette.primary.main}` }}
				>
					<Box
						sx={{
							my: 3,
							mx: 2.5,
							py: 2,
							px: 1.5,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							backgroundColor: "grey.300",
							borderRadius: "8px",
						}}
					>
						<Typography variant="h5" fontWeight={600}>
							GESIAR
						</Typography>
					</Box>
					<Typography variant="h4" textAlign="center">
						Gestor de Inspecciones
					</Typography>

					<LoginForm
						onSubmit={handleSubmit(onSubmit)}
						register={register}
						errors={errors}
						isPending={isPending}
					/>
				</Paper>
			</Container>
		</Box>
	);
};

export default LoginPage;
