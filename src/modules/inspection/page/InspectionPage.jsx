import {
	Box,
	Button,
	Typography,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import { useState } from "react";
import { InspectionTable } from "../components/InspectionTable.jsx";
import { InspectionForm } from "../components/InspectionForm.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useInspection } from "../hooks/useInspection.jsx";

export const InspectionPage = () => {
	const [open, setOpen] = useState(false);
	const { inspecitons, addInspeciton, inspectionsSelect } = useInspection();
	const {
		register,
		handleSubmit,
		reset,
		control,
		onSubmit,
		formState: { errors },
	} = useForm({
		// resolver: yupResolver({}),
		defaultValues: {
			name: "",
			document: "",
			email: "",
			address: "",
			department: "",
			city: "",
			phone: "",
		},
	});

	return (
		<Box sx={{ width: "100%", minHeight: "100%", p: 3 }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					mb: 3,
				}}
			>
				<Typography variant="h4" fontWeight="bold">
					Inspecciones
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpen(true)}
					sx={{ height: 40 }}
				>
					Nueva Inspección
				</Button>
			</Box>

			<InspectionTable />

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth="md" // Controla el ancho máximo
				fullWidth // Hace que el diálogo ocupe el 100% del ancho definido por `maxWidth`
				sx={{
					"& .MuiDialog-paper": {
						width: "50%", // Ocupa el 50% del ancho de la pantalla
						maxWidth: "none", // Evita que `maxWidth` sobreescriba el ancho
					},
				}}
			>
				<DialogTitle>Agregar Inspección</DialogTitle>
				<DialogContent>
					<InspectionForm
						register={register}
						control={control}
						errors={errors}
						onSubmit={onSubmit}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">
						Cancelar
					</Button>
					<Button
						form="insure-form"
						type="submit"
						color="primary"
						variant="contained"
					>
						Guardar
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
