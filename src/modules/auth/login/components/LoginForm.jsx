import React from "react";
import { TextField, Button, Box } from "@mui/material";

const LoginForm = ({ onSubmit, register, errors, isPending }) => {
	return (
		<Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
			<TextField
				margin="normal"
				required
				fullWidth
				label="Usuario"
				{...register("username", { required: "El usuario es requerido" })}
				error={!!errors.username}
				helperText={errors.username ? errors.username.message : ""}
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				label="Contraseña"
				type="password"
				{...register("password", { required: "La contraseña es requerida" })}
				error={!!errors.password}
				helperText={errors.password ? errors.password.message : ""}
			/>
			<Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={isPending}
				>
					{isPending ? "Cargando..." : "Ingresar"}
				</Button>
			</Box>
		</Box>
	);
};

export default LoginForm;
