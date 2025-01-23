import { InsuredTable } from "../components/InsuredTable.jsx";
import { InsuredForm } from "../components/InsuerdForm.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useInsured } from "../hooks/useInsured.jsx";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import * as yup from "yup";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
	useTheme,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useResponsiveWidth } from "../../../theme/useResponsiveWidth.jsx";

const insuredFormSchema = yup.object().shape({
	name: yup.string().required("Razon Social Asegurado es obligatoria"),
	document: yup.string().required("Documento del Asegurado es obligatorio"),
	documentType: yup.string().required("Tipo de Documento es obligatorio"),
	address: yup.string().required("Dirección Asegurado es obligatoria"),
	city: yup.string().required("Ciudad es obligatoria"),
	department: yup.string().required("Departamento Asegurado es obligatorio"),
	phone: yup.string().required("Teléfono Asegurado es obligatorio"),
	email: yup.string().required("Correo Electrónico Asegurado es obligatorio"),
});

export const InsuredPage = () => {
	const [open, setOpen] = useState(false);
	const { insureds, isInsuredsFetching, addInsured } = useInsured();
	const width = useResponsiveWidth();

	const {
		register,
		watch,
		handleSubmit,
		reset,
		control,
		setValue,
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
			phone: "",
			email: "",
		},
	});

	const handleFormSubmit = (data) => {
		addInsured(data);
		reset();
		setOpen(false);
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

			<InsuredTable data={insureds} isLoading={isInsuredsFetching} />

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth="md"
				fullWidth
				sx={{
					"& .MuiDialog-paper": {
						width: width,
						maxWidth: "none",
					},
				}}
			>
				<DialogTitle>Agregar Asegurado</DialogTitle>
				<DialogContent>
					<InsuredForm
						register={register}
						watch={watch}
						errors={errors}
						onSubmit={handleSubmit(handleFormSubmit)}
						control={control}
						setValue={setValue}
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
