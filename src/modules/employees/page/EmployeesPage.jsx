import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { EmployeesForm } from "../components/EmployeesForm.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { EmployeesTable } from "../components/EmployeesTable.jsx";
import { useEmployee } from "../hooks/useEmployee.jsx";
import * as yup from "yup";
import { MODAL_STATES } from "../../../utils/constanst.js";

const employeesFormSchema = yup.object().shape({
	username: yup.string().required("Nombre es obligatorio"),
	documentType: yup.string().required("Tipo de Documento es obligatorio"),
	document: yup.string().required("Documento es obligatorio"),
	email: yup.string().email("Email no válido").required("Email es obligatorio"),
	phone: yup.string().required("Teléfono es obligatorio"),
});

export const EmployeesPage = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [modal, setModal] = useState(MODAL_STATES.CLOSED);
	const { employees, isEmployeesFetching, addEmployee } = useEmployee();
	const {
		watch,
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(employeesFormSchema),
		defaultValues: {
			username: "",
			documentType: "",
			document: "",
			email: "",
			phone: "",
		},
	});

	const handleModalClose = () => {
		setModal(MODAL_STATES.CLOSED);
		reset({
			id: undefined,
			username: "",
			documentType: "",
			document: "",
			email: "",
			phone: "",
		});
	};

	const handleFormSubmit = (data) => {
		addEmployee(data);
		reset();
		setModal(MODAL_STATES.CLOSED);
		handleModalClose();
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
					Inspectores
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setModal(MODAL_STATES.ADD)}
					sx={{ height: 40 }}
				>
					Nuevo Inspector
				</Button>
			</Box>

			<EmployeesTable
				employees={employees}
				isLoading={isEmployeesFetching}
				setAnchorEl={setAnchorEl}
				anchorEl={anchorEl}
				isOptionsMenuOpen={Boolean(anchorEl)}
				selectedRowId={selectedRowId}
				onCloseMenu={() => setAnchorEl(null)}
				setSelectedRowId={setSelectedRowId}
				onEdit={(row) => {
					reset({
						id: row.id,
						username: row.username,
						documentType: row.documentType,
						document: row.document,
						email: row.email,
						phone: row.phone,
					});
					setModal(MODAL_STATES.EDIT);
				}}
			/>

			<Dialog
				open={modal !== MODAL_STATES.CLOSED}
				onClose={handleModalClose}
				maxWidth="md" // Controla el ancho máximo
				fullWidth // Hace que el diálogo ocupe el 100% del ancho definido por `maxWidth`
				sx={{
					"& .MuiDialog-paper": {
						width: "50%", // Ocupa el 50% del ancho de la pantalla
						maxWidth: "none", // Evita que `maxWidth` sobreescriba el ancho
					},
				}}
			>
				<DialogTitle>Agregar Inpsector</DialogTitle>
				<DialogContent>
					<EmployeesForm
						register={register}
						watch={watch}
						control={control}
						errors={errors}
						onSubmit={handleSubmit(handleFormSubmit)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleModalClose} color="primary">
						Cancelar
					</Button>
					<Button
						form="employees-form"
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
