import {
	FormControl,
	InputLabel,
	Select,
	TextField,
	MenuItem,
	Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

const documentTypes = [
	{ id: 1, value: "CC", label: "Cédula de Ciudadanía" },
	{ id: 2, value: "CE", label: "Cédula de Extranjería" },
	{ id: 3, value: "NIT", label: "NIT" },
	{ id: 4, value: "PAS", label: "Pasaporte" },
];

export const InsuredForm = ({ register, onSubmit, errors, control }) => {
	return (
		<form id="insured-form" onSubmit={onSubmit}>
			<TextField
				fullWidth
				label="Razón Social Asegurado"
				{...register("name")}
				sx={{ mb: 2, mt: 1 }}
				error={!!errors.name}
				helperText={errors.name ? errors.name.message : ""}
			/>
			<FormControl
				fullWidth
				margin="dense"
				sx={{ mb: 2 }}
				error={!!errors.documentType}
			>
				<InputLabel id="simple-select-label">
					Tipo de Documento del Asegurado
				</InputLabel>
				<Controller
					name="documentType"
					labelId="simple-select-label"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							label="Tipo de Documento del Asegurado"
							error={!!errors.documentType}
						>
							<MenuItem value="" disabled>
								Seleccione un tipo de documento
							</MenuItem>
							{documentTypes.map((type, i) => (
								<MenuItem key={type.id} value={type.value}>
									{type.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				{errors.documentType && (
					<Typography
						color="error.main"
						fontSize="small"
						sx={{ mt: "3px", ml: "14px", fontSize: "12px" }}
					>
						{errors.documentType.message}
					</Typography>
				)}
			</FormControl>
			<TextField
				fullWidth
				label="Documento del Asegurado"
				{...register("document")}
				sx={{ mb: 2 }}
				error={!!errors.document}
				helperText={errors.document ? errors.document.message : ""}
			/>
			<TextField
				fullWidth
				label="Dirección Asegurado"
				{...register("address")}
				sx={{ mb: 2 }}
				error={!!errors.address}
				helperText={errors.address ? errors.address.message : ""}
			/>
			<TextField
				fullWidth
				label="Ciudad Asegurado"
				{...register("city")}
				sx={{ mb: 2 }}
				error={!!errors.city}
				helperText={errors.city ? errors.city.message : ""}
			/>
			<TextField
				fullWidth
				label="Departamento Asegurado"
				{...register("department")}
				sx={{ mb: 2 }}
				error={!!errors.department}
				helperText={errors.department ? errors.department.message : ""}
			/>
		</form>
	);
};
