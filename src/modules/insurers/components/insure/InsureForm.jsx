import { Box, TextField } from "@mui/material";

export const InsureForm = ({ register, onSubmit, errors }) => {
	return (
		<form id="insure-form" onSubmit={onSubmit}>
			<Box display="flex" flexDirection="column" gap={2}>
				<TextField
					label="Nombre"
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name ? errors.name.message : ""}
					required
				/>
				<TextField
					label="Documento"
					{...register("document")}
					error={!!errors.document}
					helperText={errors.document ? errors.document.message : ""}
					required
				/>
				<TextField
					label="Email"
					{...register("email")}
					error={!!errors.email}
					helperText={errors.email ? errors.email.message : ""}
					required
				/>
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
				<TextField
					label="Teléfono"
					{...register("phone")}
					error={!!errors.phone}
					helperText={errors.phone ? errors.phone.message : ""}
					required
				/>
			</Box>
		</form>
	);
};
