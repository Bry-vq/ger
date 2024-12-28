import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export const InspectionForm = ({ control, errors, onSubmit }) => {
	return (
		<form id="inspection-form" onSubmit={onSubmit}>
			<FormControl
				fullWidth
				margin="dense"
				// error={!!errors.insuredId}
				sx={{ mb: 2, mt: 1 }}
			>
				<InputLabel id="simple-select-label-insured">Asegurado</InputLabel>
				<Controller
					name="insuredId"
					labelId="simple-select-label-insured"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							label="Asegurado"
							//  error={!!errors.insuredId}
						>
							<MenuItem key={0} value={0}>
								Option
							</MenuItem>
							<MenuItem key={1} value={2}>
								Option2
							</MenuItem>
						</Select>
					)}
				/>
				{/* {errors.insurerId && (
					<Box color="error.main" fontSize="small">
						{errors.insurerId.message}
					</Box>
				)} */}
			</FormControl>
			<FormControl
				fullWidth
				margin="dense"
				sx={{ mb: 2, mt: 0 }}
				// error={!!errors.insurerId}
			>
				<InputLabel id="simple-select-label-insurer">
					Compañia Aseguradora
				</InputLabel>
				<Controller
					name="insurerId"
					labelId="simple-select-label-insurer"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							label="Compañia Aseguradora"
							// error={!!errors.insurerId}
						>
							<MenuItem key={0} value={0}>
								Option
							</MenuItem>
							<MenuItem key={1} value={2}>
								Option2
							</MenuItem>
						</Select>
					)}
				/>
				{/* {errors.insurerId && (
					<Box color="error.main" fontSize="small">
						{errors.insurerId.message}
					</Box>
				)} */}
			</FormControl>

			<TextField
				fullWidth
				label="Sucursal Aseguradora"
				variant="outlined"
				sx={{ mb: 2 }}
			/>
			<TextField
				fullWidth
				label="Fecha de Solicitud"
				variant="outlined"
				sx={{ mb: 2 }}
			/>
			<TextField
				fullWidth
				label="Fecha de Inspección"
				variant="outlined"
				sx={{ mb: 2 }}
			/>

			<TextField fullWidth label="Tarifa" variant="outlined" sx={{ mb: 2 }} />
			<TextField
				fullWidth
				label="Honorarios Extras"
				variant="outlined"
				multiline
				sx={{ mb: 2 }}
			/>
			<TextField
				fullWidth
				label="Comentarios"
				variant="outlined"
				multiline
				rows={4}
				sx={{ mb: 2 }}
			/>
		</form>
	);
};
