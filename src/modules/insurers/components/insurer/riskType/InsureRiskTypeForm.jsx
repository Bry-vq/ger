import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";

export const InsureRiskTypeForm = ({
	open,
	onClose,
	onSubmit,
	register,
	watch,
	errors,
	modalType,
}) => {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>
				{modalType === "add"
					? "Agregar Tipo de Riesgo"
					: "Editar Tipo de Riesgo"}
			</DialogTitle>
			<DialogContent>
				<form id="risk-type-form" onSubmit={onSubmit}>
					<TextField
						margin="dense"
						label="Nombre del Tipo de Riesgo"
						fullWidth
						variant="outlined"
						{...register("name", {
							required: "El nombre es obligatorio",
						})}
						value={watch("name")}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
					<TextField
						margin="dense"
						label="Descripción"
						fullWidth
						variant="outlined"
						{...register("description", {
							required: "La descripción es obligatoria",
						})}
						value={watch("description")}
						error={!!errors.description}
						helperText={errors.description?.message}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancelar
				</Button>
				<Button
					form="risk-type-form"
					type="submit"
					color="primary"
					variant="contained"
				>
					Guardar
				</Button>
			</DialogActions>
		</Dialog>
	);
};
