import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Select,
	FormControl,
	InputLabel,
	Button,
	MenuItem,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const InsurerRateForm = ({
	open,
	onClose,
	onSubmit,
	control,
	register,
	watch,
	errors,
	modalType,
	riskTypes,
	ranges,
}) => {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>
				{modalType === "add"
					? "Agregar Tarifa de Aseguradora"
					: "Editar Tarifa de Aseguradora"}
			</DialogTitle>
			<DialogContent>
				<form onSubmit={onSubmit}>
					{/* Select for Risk Type */}
					<FormControl fullWidth margin="dense">
						<InputLabel>Tipo de Riesgo</InputLabel>
						<Controller
							name="riskTypeId"
							control={control}
							defaultValue={watch("riskTypeId")}
							rules={{ required: "El tipo de riesgo es obligatorio" }}
							render={({ field }) => (
								<Select {...field} error={!!errors.riskTypeId}>
									{riskTypes.map((type, i) => (
										<MenuItem key={type.value} value={type.value}>
											{type.label}
										</MenuItem>
									))}
								</Select>
							)}
						/>
						{errors.riskTypeId && (
							<Box color="error.main" fontSize="small">
								{errors.riskTypeId.message}
							</Box>
						)}
					</FormControl>
					{/* Select for Insurability Range */}
					<FormControl fullWidth margin="dense">
						<InputLabel>Rango de Asegurabilidad</InputLabel>
						<Controller
							name="insurabilityRangeId"
							control={control}
							defaultValue={watch("insurabilityRangeId")}
							rules={{
								required: "El rango de asegurabilidad es obligatorio",
							}}
							render={({ field }) => (
								<Select {...field} error={!!errors.insurabilityRangeId}>
									{ranges.map((range) => (
										<MenuItem key={range.value} value={range.value}>
											{range.label}
										</MenuItem>
									))}
								</Select>
							)}
						/>
						{errors.insurabilityRangeId && (
							<Box color="error.main" fontSize="small">
								{errors.insurabilityRangeId.message}
							</Box>
						)}
					</FormControl>
					{/* Field for Insured Value */}
					<TextField
						margin="dense"
						label="Valor Tarifa"
						fullWidth
						variant="outlined"
						type="number"
						{...register("insuredValue", {
							required: "El valor de la tarifa asegurada es obligatorio",
						})}
						error={!!errors.insuredValue}
						helperText={errors.insuredValue?.message}
					/>
					{/* Field for Fee */}
					<TextField
						margin="dense"
						label="Honorario Inspector"
						fullWidth
						variant="outlined"
						type="number"
						{...register("fee", {
							required: "La tarifa del inspector es obligatoria",
						})}
						error={!!errors.fee}
						helperText={errors.fee?.message}
					/>
					{/* Field for Year */}
					<TextField
						margin="dense"
						label="Año de Tarifa"
						fullWidth
						variant="outlined"
						type="number"
						{...register("year", {
							required: "El año de la tarifa es obligatorio",
						})}
						error={!!errors.year}
						helperText={errors.year?.message}
					/>
					{/* Dialog actions */}
					<DialogActions>
						<Button onClick={onClose} color="primary">
							Cancelar
						</Button>
						<Button type="submit" color="primary" variant="contained">
							Guardar
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
};
