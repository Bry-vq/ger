import { IconDotsVertical, IconEye } from "@tabler/icons-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import {
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { InsuredBranchForm } from "./InsuredBranchForm.jsx";
import { useInsured } from "../hooks/useInsured.jsx";

const InsuredBranchesFormSchema = yup.object().shape({
	name: yup.string().required("Sede es obligatoria"),
	department: yup.string().required("Departamento es obligatorio"),
	city: yup.string().required("Ciudad es obligatoria"),
	address: yup.string().required("Dirección es obligatoria"),
	phone: yup.string().required("Teléfono es obligatorio"),
});

export const InsuredBranchesTable = () => {
	const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const { insuredId } = useParams();
	const { insuredBranches, addInsuredBranch } = useInsured(insuredId);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(InsuredBranchesFormSchema),
		defaultValues: {
			name: "",
			city: "",
			department: "",
			address: "",
			phone: "",
		},
	});

	const handleMenuOptionClick = (event, rowId) => {
		setAnchorEl(event.currentTarget);
		setSelectedRowId(rowId);
		setIsOptionsMenuOpen(true);
	};

	const handleMenuOptionClose = () => {
		setAnchorEl(null);
		setIsOptionsMenuOpen(false);
	};

	const handleFormSubmit = (data) => {
		const finalData = {
			...data,
			insuredId: Number.parseInt(insuredId),
		};
		addInsuredBranch(finalData);
		reset();
		setOpen(false);
	};

	const columns = [
		{ field: "name", headerName: "Sede", flex: 1 },
		{ field: "department", headerName: "Departamento", flex: 1 },
		{ field: "city", headerName: "Ciudad", flex: 1 },
		{ field: "address", headerName: "Dirección", flex: 1 },
		{ field: "phone", headerName: "Teléfono", flex: 1 },
	];

	return (
		<Box>
			<Box display="flex" justifyContent="flex-end" mb={2}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpen(!open)}
				>
					Agregar Sede
				</Button>
			</Box>
			<Paper elevation={1}>
				<DataGrid
					columns={columns}
					rows={insuredBranches}
					getRowId={(row) => row.id}
				/>
			</Paper>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth="md"
				fullWidth
				sx={{
					"& .MuiDialog-paper": {
						width: "50%", // Ocupa el 50% del ancho de la pantalla
						maxWidth: "none", // Evita que `maxWidth` sobreescriba el ancho
					},
				}}
			>
				<DialogTitle>Agregar Sede del Asegurado</DialogTitle>
				<DialogContent>
					<InsuredBranchForm
						register={register}
						onSubmit={handleSubmit(handleFormSubmit)}
						errors={errors}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">
						Cancelar
					</Button>
					<Button
						form="insuerd-branch-form"
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
