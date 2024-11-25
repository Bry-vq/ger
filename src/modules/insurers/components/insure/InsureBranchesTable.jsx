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
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { IconDotsVertical, IconEye } from "@tabler/icons-react";
import { BranchForm } from "../branch/BranchForm.jsx";
import { useInsurerBranches } from "../../hooks/useInsurerBranch.jsx";

export const BranchesTable = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedRowId, setSelectedRowId] = useState(null); // Para almacenar la fila seleccionada
	const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
	const [open, setOpen] = useState(false);
	const { branches } = useInsurerBranches(1);
	console.log(branches);

	const handleMenuOptionClick = (event, rowId) => {
		setAnchorEl(event.currentTarget);
		setSelectedRowId(rowId); // Establece la fila seleccionada
		setIsOptionsMenuOpen(true);
	};

	const handleMenuOptionClose = () => {
		setAnchorEl(null);
		setIsOptionsMenuOpen(false);
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
					<BranchForm />
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
