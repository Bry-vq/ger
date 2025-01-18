import { useSupervisor } from "../../hooks/useSupervisor.jsx";
import {
	DialogContent,
	DialogActions,
	DialogTitle,
	Button,
	Dialog,
	Paper,
	Box,
} from "@mui/material";
import { AdvisorForm } from "./AdvisorForm.jsx";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const advisorFormSchema = yup.object().shape({
	name: yup.string().required("Nombre es obligatorio"),
	phone: yup.string().required("Teléfono es obligatorio"),
});

export const AdvisorTable = () => {
	const { branchId } = useParams();
	const [open, setOpen] = useState(false);
	const { supervisors, isFetching, addSupervisor } = useSupervisor(branchId);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(advisorFormSchema),
		defaultValues: {
			name: "",
			phone: "",
			email: "test@test.com",
		},
	});

	const columns = [
		{ field: "name", headerName: "Nombre", flex: 1 },
		{ field: "phone", headerName: "Telefono", flex: 1 },
	];

	const handleFormSubmit = (data) => {
		const finalData = { ...data, branchId: Number.parseInt(branchId) };
		addSupervisor(finalData);
		reset();
		setOpen(false);
	};

	return (
		<>
			<Box display="flex" justifyContent="flex-end" mb={2}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpen(!open)}
					sx={{ height: 40 }}
				>
					Agregar Asesor
				</Button>
			</Box>
			<Paper elevation={1}>
				<DataGrid
					columns={columns}
					rows={supervisors}
					getRowId={(row) => row.id}
				/>
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
					<DialogTitle>Agregar Asesor</DialogTitle>
					<DialogContent>
						<AdvisorForm
							register={register}
							errors={errors}
							onSubmit={handleSubmit(handleFormSubmit)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setOpen(false)} color="primary">
							Cancelar
						</Button>
						<Button
							form="advisor-form"
							type="submit"
							color="primary"
							variant="contained"
						>
							Guardar
						</Button>
					</DialogActions>
				</Dialog>
			</Paper>
		</>
	);
};
