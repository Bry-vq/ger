import {
	Autocomplete,
	Box,
	createFilterOptions,
	TextField,
} from "@mui/material";
import { CITES } from "../../../const/departments.js";
import { MuiTelInput } from "mui-tel-input";

const filterOptions = createFilterOptions({
	stringify: (option) => option.name,
	limit: 8,
});

export const InsuredBranchForm = ({
	register,
	onSubmit,
	errors,
	setValue,
	watch,
}) => {
	return (
		<form id="insured-branch-form" onSubmit={onSubmit}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<TextField
					label="Sede"
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name ? errors.name.message : ""}
					sx={{ mt: 2, mb: 2 }}
				/>
				<TextField
					label="Direccion"
					{...register("address")}
					error={!!errors.address}
					helperText={errors.address ? errors.address.message : ""}
					sx={{ mb: 2 }}
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
				<MuiTelInput
					fullWidth
					defaultCountry={"co"}
					label="Teléfono"
					onChange={(value) => setValue("phone", value)}
					value={watch("phone") || "+57"}
					error={!!errors.phone}
					helperText={errors.phone ? errors.phone.message : ""}
				/>
			</Box>
		</form>
	);
};
