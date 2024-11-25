import { Box, TextField, useTheme } from "@mui/material";

export const BranchForm = () => {
	const theme = useTheme();

	return (
		<form>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<TextField
					label="Dirección"
					name="address"
					// value={branchData.address}
					// onChange={handleChange}
					required
				/>
				<TextField
					label="Departamento"
					name="departament"
					// value={branchData.departament}
					// onChange={handleChange}
					required
				/>
				<TextField
					label="Ciudad"
					name="city"
					// value={branchData.city}
					// onChange={handleChange}
					required
				/>
			</Box>
		</form>
	);
};
