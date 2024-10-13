import React from "react";
import { Container, Box, Paper, useTheme } from "@mui/material";
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
				// backgroundImage: 'url(/src/assets/Login_Inventio.jpg)',
				// backgroundPosition: 'center',
				// backgroundSize: 'cover',
			}}
		>
			<Container maxWidth="sm">
				<Paper
					elevation={6}
					sx={{ p: 4, borderTop: `12px solid ${theme.palette.primary.main}` }}
				>
					<Box mb={4} textAlign="center">
						{/* <img  width={300} /> */}
					</Box>
					<LoginForm />
				</Paper>
			</Container>
		</Box>
	);
};

export default LoginPage;
