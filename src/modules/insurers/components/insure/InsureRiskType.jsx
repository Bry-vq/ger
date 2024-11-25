import {
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import { useRiskType } from "../../hooks/useRiskType.jsx";
import { useParams } from "react-router-dom";

export const InsureRiskType = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedRowId, setSelectedRowId] = useState(null); // Para almacenar la fila seleccionada
	const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
	const { insurerId } = useParams();
	const { riskTypes, addRisk } = useRiskType(insurerId);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const handleMenuOptionClick = (event, rowId) => {
		setAnchorEl(event.currentTarget);
		setSelectedRowId(rowId);
		setIsOptionsMenuOpen(true);
	};

	const handleMenuOptionClose = () => {
		setAnchorEl(null);
		setIsOptionsMenuOpen(false);
	};

	const handleModalOpen = () => setIsModalOpen(true);
	const handleModalClose = () => {
		setIsModalOpen(false);
		reset();
	};

	const onSubmit = (data) => {
		const finalData = {
			...data,
			insurerId: Number.parseInt(insurerId),
		};
		console.log(finalData);
		addRisk(finalData);
		handleModalClose();
	};

	const columns = [
		{ field: "id", headerName: "ID", flex: 1 },
		{ field: "name", headerName: "Tipo de Riesgo", flex: 2 },
		{ field: "description", headerName: "Descripción", flex: 3 },
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
						open={isOptionsMenuOpen && selectedRowId === params.row.id}
						onClose={handleMenuOptionClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<MenuItem onClick={handleMenuOptionClose}>
							<IconEdit size={24} />
							Editar
						</MenuItem>
					</Menu>
				</Box>
			),
		},
	];

	return (
		<Box>
			{/* Botón para crear un nuevo Risk Type */}
			<Box display="flex" justifyContent="flex-end" mb={2}>
				<Button variant="contained" color="primary" onClick={handleModalOpen}>
					Agregar Tipo de Riesgo
				</Button>
			</Box>

			{/* Tabla de Risk Types */}
			<Paper elevation={1}>
				<DataGrid
					columns={columns}
					rows={riskTypes}
					getRowId={(row) => row.id}
				/>
			</Paper>

			{/* Modal para agregar nuevo tipo de riesgo */}
			<Dialog
				open={isModalOpen}
				onClose={handleModalClose}
				fullWidth
				maxWidth="sm"
			>
				<DialogTitle>Agregar Tipo de Riesgo</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							margin="dense"
							label="Nombre del Tipo de Riesgo"
							fullWidth
							variant="outlined"
							{...register("name", { required: "El nombre es obligatorio" })}
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
							error={!!errors.description}
							helperText={errors.description?.message}
						/>
						<DialogActions>
							<Button onClick={handleModalClose} color="primary">
								Cancelar
							</Button>
							<Button type="submit" color="primary" variant="contained">
								Guardar
							</Button>
						</DialogActions>
					</form>
				</DialogContent>
			</Dialog>
		</Box>
	);
};
