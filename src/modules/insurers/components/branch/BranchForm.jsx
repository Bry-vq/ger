import {
	Box,
	createFilterOptions,
	TextField,
	Autocomplete,
} from "@mui/material";
import { restrictToColombianPhone } from "../../../../utils/functions.js";
import { CITES } from "../../../../const/departments.js";

const filterOptions = createFilterOptions({
	stringify: (option) => option.name,
	limit: 8,
});

export const BranchForm = ({ register, onSubmit, errors, setValue }) => {
	return (
		<form id="branch-form" onSubmit={onSubmit}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<TextField
					label="Nombre Sucursal"
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name ? errors.name.message : ""}
					required
				/>
				<Autocomplete
					disablePortal
					onChange={(_, newValue) => {
						setValue("department", newValue.department);
						setValue("city", newValue.name);
					}}
					disableClearable
					filterOptions={filterOptions}
					options={CITES}
					getOptionLabel={(option) => `${option.name} - ${option.department}`}
					renderOption={(props, option) => {
						const { key, ...restProps } = props;
						return (
							<Box key={option.id} component="li" {...restProps}>
								{`${option.name} - ${option.department}`}
							</Box>
						);
					}}
					renderInput={(params) => <TextField {...params} label="Ciudad" />}
				/>
				<TextField
					label="Direccion"
					{...register("address")}
					error={!!errors.address}
					helperText={errors.address ? errors.address.message : ""}
					required
				/>
				<TextField
					label="Teléfono"
					{...register("phone")}
					onChange={restrictToColombianPhone}
					error={!!errors.phone}
					helperText={errors.phone ? errors.phone.message : ""}
					required
				/>
			</Box>
		</form>
	);
};
