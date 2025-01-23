import {
	FormControl,
	InputLabel,
	Select,
	TextField,
	MenuItem,
	Typography,
	Autocomplete,
	Box,
	createFilterOptions,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { CITES } from "../../../const/departments";
import { MuiTelInput } from "mui-tel-input";

const documentTypes = [
	{ id: 1, value: "CC", label: "Cédula de Ciudadanía" },
	{ id: 2, value: "CE", label: "Cédula de Extranjería" },
	{ id: 3, value: "NIT", label: "NIT" },
	{ id: 4, value: "PAS", label: "Pasaporte" },
];
const filterOptions = createFilterOptions({
	stringify: (option) => option.name,
	limit: 8,
});

export const InsuredForm = ({
	register,
	onSubmit,
	watch,
	errors,
	control,
	setValue,
}) => {
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
				onKeyDown={(e) => {
					if (
						e.key === "." ||
						e.key === "e" ||
						e.key === "+" ||
						e.key === "-"
					) {
						e.preventDefault();
					}
				}}
				sx={{ mb: 2 }}
				error={!!errors.document}
				helperText={errors.document ? errors.document.message : ""}
			/>
			<Autocomplete
				disablePortal
				sx={{ mb: 2 }}
				onChange={(_, newValue) => {
					setValue("department", newValue.department);
					setValue("city", newValue.name);
				}}
				disableClearable
				filterOptions={filterOptions}
				options={CITES}
				getOptionLabel={(option) => `${option.name} - ${option.department}`}
				renderOption={(props, option) => {
					const { ...optionProps } = props;
					return (
						<Box key={option.id} component="li" {...optionProps}>
							{`${option.name} - ${option.department}`}
						</Box>
					);
				}}
				renderInput={(params) => (
					<TextField {...params} label="Ciudad Asegurado" />
				)}
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
				label="Correo Electrónico"
				{...register("email")}
				sx={{ mb: 2 }}
				error={!!errors.email}
				helperText={errors.email ? errors.email.message : ""}
				type="email"
			/>
			<MuiTelInput
				fullWidth
				defaultCountry={"co"}
				label="Teléfono"
				onChange={(value) => setValue("phone", value)}
				value={watch("phone") || "+57"}
				error={!!errors.phone}
				helperText={errors.phone ? errors.phone.message : ""}
			/>
		</form>
	);
};
