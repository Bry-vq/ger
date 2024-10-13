import React from "react";
import { TextField, Button, Box } from "@mui/material";

const LoginForm = () => {
	return (
		<Box component="form" noValidate sx={{ mt: 1 }}>
			<TextField
				margin="normal"
				required
				fullWidth
				label="Email Address"
				name="email"
				type="email"
				autoComplete="email"
			/>
			<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
				<Button
					type="button"
					variant="contained"
					color="primary"
					sx={{ mr: 2 }}
				>
					Sign In
				</Button>
			</Box>
		</Box>
	);
};

export default LoginForm;
