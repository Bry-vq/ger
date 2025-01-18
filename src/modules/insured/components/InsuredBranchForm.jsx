import { Box, TextField } from "@mui/material";

export const InsuredBranchForm = ({ register, onSubmit, errors }) => {
	return (
		<form id="insuerd-branch-form" onSubmit={onSubmit}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<TextField
					label="Sede"
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name ? errors.name.message : ""}
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
				<TextField
					label="Direccion"
					{...register("address")}
					error={!!errors.address}
					helperText={errors.address ? errors.address.message : ""}
					required
				/>
				<TextField
					label="Telefono"
					{...register("phone")}
					error={!!errors.phone}
					helperText={errors.phone ? errors.phone.message : ""}
					required
				/>
			</Box>
		</form>
	);
};
