import {
	Autocomplete,
	Box,
	createFilterOptions,
	TextField,
} from "@mui/material";
import { CITES } from "../../../../../const/departments";
import { restrictToColombianPhone } from "../../../../../utils/functions";
import { MuiTelInput } from "mui-tel-input";

const filterOptions = createFilterOptions({
	stringify: (option) => option.name,
	limit: 8,
});

export const InsureForm = ({ register, onSubmit, errors, setValue, watch }) => {
	console.log("watch", watch());
	return (
		<form id="insure-form" onSubmit={onSubmit}>
			<Box display="flex" flexDirection="column" gap={2}>
				<TextField
					label="Nombre"
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name ? errors.name.message : ""}
					value={watch("name")}
				/>
				<TextField
					label="Documento"
					{...register("document")}
					value={watch("document")}
					type="number"
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
					error={!!errors.document}
					helperText={errors.document ? errors.document.message : ""}
				/>
				<TextField
					label="Email"
					{...register("email")}
					error={!!errors.email}
					helperText={errors.email ? errors.email.message : ""}
					value={watch("email")}
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
						const { ...optionProps } = props;
						return (
							<Box key={option.id} component="li" {...optionProps}>
								{`${option.name} - ${option.department}`}
							</Box>
						);
					}}
					defaultValue={
						watch("city")
							? CITES.find((city) => city.name === watch("city"))
							: null
					}
					renderInput={(params) => <TextField {...params} label="Ciudad" />}
				/>
				<TextField
					label="Dirección"
					{...register("address")}
					error={!!errors.address}
					helperText={errors.address ? errors.address.message : ""}
					value={watch("address")}
				/>
				<MuiTelInput
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
