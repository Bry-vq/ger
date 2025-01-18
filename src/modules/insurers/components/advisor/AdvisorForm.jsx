import { Box, TextField } from "@mui/material";
import { restrictToColombianPhone } from "../../../../utils/functions";

export const AdvisorForm = ({ register, onSubmit }) => {
	return (
		<form id="advisor-form" onSubmit={onSubmit}>
			<Box display="flex" flexDirection="column" gap={2}>
				<TextField {...register("name")} label="Nombre" required />
				<TextField
					{...register("phone")}
					label="Teléfono"
					onChange={restrictToColombianPhone}
					required
				/>
			</Box>
		</form>
	);
};
