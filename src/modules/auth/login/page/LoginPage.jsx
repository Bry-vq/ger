import React from "react";
import { Container, Box, Paper, useTheme, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm.jsx";

const LoginPage = () => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
				//backgroundImage: './src/assets/img/LogoIAR.jpeg)',
				// backgroundPosition: 'center',
				// backgroundSize: 'cover',
			}}
		>
			<Container maxWidth="sm">
				<Paper
					elevation={6}
					sx={{ p: 4, borderTop: `12px solid ${theme.palette.primary.main}` }}
				>
					<img src="./src/assets/logoIar.jpg" alt="Logo IAR" />
					<Typography variant="h4" textAlign="center">
						Gestor de Inspecciones
					</Typography>
					<LoginForm />
				</Paper>
			</Container>
		</Box>
	);
};

export default LoginPage;
