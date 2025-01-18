import React from "react";
import { TextField, Button, Box } from "@mui/material";

const LoginForm = () => {
	return (
		<Box component="form" noValidate sx={{ mt: 1 }}>
			<TextField
				margin="normal"
				required
				fullWidth
				label="Correro Electronico"
				name="email"
				type="email"
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				label="Contraseña"
				name="password"
				type="password"
			/>
			<Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
				<Button
					type="button"
					variant="contained"
					color="primary"
					sx={{ mr: 2 }}
				>
					Ingresar
				</Button>
			</Box>
		</Box>
	);
};

export default LoginForm;
