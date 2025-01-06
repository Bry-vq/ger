import { Box, TextField, useTheme } from "@mui/material";

export const BranchForm = ({ register, onSubmit, errors }) => {
	return (
		<form id="branch-form" onSubmit={onSubmit}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<TextField
					label="Dirección"
					{...register("address")}
					error={!!errors.address}
					helperText={errors.address ? errors.address.message : ""}
					required
				/>
				<TextField
					label="Departamento"
					{...register("department")}
					error={!!errors.department}
					helperText={errors.department ? errors.department.message : ""}
					required
				/>
				<TextField
					label="Ciudad"
					{...register("city")}
					error={!!errors.city}
					helperText={errors.city ? errors.city.message : ""}
					required
				/>
			</Box>
		</form>
	);
};
