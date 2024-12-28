import React, { useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InsuredTable } from "../components/InsuredTable.jsx";
import { InsuredForm } from "../components/InsuerdForm.jsx";

const insuredFormSchema = yup.object().shape({
	name: yup.string().required("Razon Social Asegurado es obligatoria"),
	document: yup.string().required("Documento del Asegurado es obligatorio"),
	documentType: yup.string().required("Tipo de Documento es obligatorio"),
	address: yup.string().required("Dirección Asegurado es obligatoria"),
	city: yup.string().required("Ciudad es obligatoria"),
	department: yup.string().required("Departamento Asegurado es obligatorio"),
});

export const InsuredPage = () => {
	const [open, setOpen] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(insuredFormSchema),
		defaultValues: {
			name: "",
			documentType: "",
			document: "",
			address: "",
			city: "",
			department: "",
		},
	});

	const handleFormSubmit = (data) => {
		console.log(data);
		// reset();
		// setOpen(false);
	};

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
					Asegurados
				</Typography>
				<Button variant="contained" onClick={() => setOpen(true)}>
					Agregar Asegurado
				</Button>
			</Box>

			<InsuredTable />

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth="md"
				fullWidth
				sx={{
					"& .MuiDialog-paper": {
						width: "50%",
						maxWidth: "none",
					},
				}}
			>
				<DialogTitle>Agregar Asegurado</DialogTitle>
				<DialogContent>
					<InsuredForm
						register={register}
						errors={errors}
						onSubmit={handleSubmit(handleFormSubmit)}
						control={control}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">
						Cancelar
					</Button>
					<Button
						form="insured-form"
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
