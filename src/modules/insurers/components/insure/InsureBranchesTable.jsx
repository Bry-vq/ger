import { useInsurerBranches } from "../../hooks/useInsurerBranch.jsx";
import { IconDotsVertical, IconEye } from "@tabler/icons-react";
import { BranchForm } from "../branch/BranchForm.jsx";
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

const branchesFormSchema = yup.object().shape({
	address: yup.string().required("Dirección es obligatoria"),
	city: yup.string().required("Ciudad es obligatoria"),
	department: yup.string().required("Departamento es obligatorio"),
});

export const BranchesTable = () => {
	const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const { insurerId } = useParams();

	const { branches, addBranch } = useInsurerBranches(1);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(branchesFormSchema),
		defaultValues: {
			address: "",
			city: "",
			department: "",
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
			insurerId: Number.parseInt(insurerId),
		};
		addBranch(finalData);
		reset();
		setOpen(false);
	};

	const columns = [
		{ field: "id", headerName: "ID", flex: 1 },
		{ field: "city", headerName: "Ciudad", flex: 1 },
		{ field: "department", headerName: "Departamento", flex: 1 },
		{
			field: "actions",
			headerName: "",
			renderCell: (params) => (
				<Box display="flex" justifyContent="center">
					<IconButton
						onClick={(event) => handleMenuOptionClick(event, params.row.id)}
					>
						<IconDotsVertical />
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={isOptionsMenuOpen && selectedRowId === params.row.id} // Abre el menú solo para la fila correcta
						onClose={handleMenuOptionClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<MenuItem
							onClick={() => {
								console.log(params.row); // Navega a la página de detalles de la aseguradora
								// navigate(
								// 	`/aseguradoras/${params.row.Aseguradora_ID}/sucursal/${params.row.Sucursal_ID}`,
								// );
								handleMenuOptionClose(); // Cierra el menú después de hacer clic
							}}
						>
							<IconEye size={24} />
							Ver
						</MenuItem>
					</Menu>
				</Box>
			),
		},
	];

	return (
		<Box>
			<Box display="flex" justifyContent="flex-end" mb={2}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpen(!open)}
				>
					Agregar Sucursal
				</Button>
			</Box>
			<Paper elevation={1}>
				<DataGrid
					columns={columns}
					rows={branches}
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
				<DialogTitle>Agregar Sucursal</DialogTitle>
				<DialogContent>
					<BranchForm
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
						form="branch-form"
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
