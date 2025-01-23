import {
	Box,
	Button,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import { InsurersTable } from "../components/insurer/insurerDetail/InsuresTable";
import { InsureForm } from "../components/insurer/insurerDetail/InsureForm";
import { useInsurers } from "../hooks/useInsurers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const insureFormSchema = yup.object().shape({
	name: yup.string().required("Nombre es obligatorio"),
	document: yup.string().required("Documento es obligatorio"),
	email: yup.string().email("Email no válido").required("Email es obligatorio"),
	address: yup.string().required("Dirección es obligatoria"),
	department: yup.string().required("Departamento es obligatorio"),
	city: yup.string().required("Ciudad es obligatoria"),
	phone: yup.string().required("Teléfono es obligatorio"),
});

export const InsuresPage = () => {
	const { insures, isInsuresFetching, addInsurer } = useInsurers();
	const [open, setOpen] = useState(false);
	const {
		register,
		watch,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(insureFormSchema),
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

	const handleFormSubmit = (data) => {
		addInsurer(data);
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
					Aseguradoras
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpen(true)}
					sx={{ height: 40 }}
				>
					Agregar aseguradora
				</Button>
			</Box>

			<InsurersTable data={insures} isLoading={isInsuresFetching} />

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
				<DialogTitle>Agregar Aseguradora</DialogTitle>
				<DialogContent>
					<InsureForm
						register={register}
						watch={watch}
						errors={errors}
						setValue={setValue}
						onSubmit={handleSubmit(handleFormSubmit)}
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
