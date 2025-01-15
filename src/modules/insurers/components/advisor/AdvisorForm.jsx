import { Box, TextField } from "@mui/material";
import { restrictToColombianPhone } from "../../../../utils/functions";

export const AdvisorForm = ({ onSubmit }) => {
	return (
		<form id="advisor-form" onSubmit={onSubmit}>
			<Box display="flex" flexDirection="column" gap={2}>
				<TextField label="Nombre" name="name" required />
				<TextField
					label="Teléfono"
					name="phone"
					onChange={restrictToColombianPhone}
					required
				/>
			</Box>
		</form>
	);
};
