import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";

export const InsureRangesForm = ({
	open,
	onClose,
	onSubmit,
	register,
	errors,
	modalType,
}) => {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>
				{modalType === "add"
					? "Agregar Rango de Asegurabilidad"
					: "Editar Rango de Asegurabilidad"}
			</DialogTitle>
			<DialogContent>
				<form onSubmit={onSubmit}>
					<TextField
						margin="dense"
						label="Valor Inicial"
						fullWidth
						variant="outlined"
						{...register("rangeStart", {
							required: "Valor inicial es requerido",
						})}
						error={!!errors.rangeStart}
						helperText={errors.rangeStart?.message}
						type="number"
					/>
					<TextField
						margin="dense"
						label="Valor Final"
						fullWidth
						variant="outlined"
						{...register("rangeEnd", {
							required: "Valor final es requerido",
						})}
						error={!!errors.rangeEnd}
						helperText={errors.rangeEnd?.message}
						type="number"
					/>
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
