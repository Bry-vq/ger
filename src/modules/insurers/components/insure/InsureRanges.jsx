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
import { useForm } from "react-hook-form"; // Import useForm
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import { useRange } from "../../hooks/useRange.jsx";
import { formatCurrency } from "../../../../utils/functions.js";
import { useParams } from "react-router-dom";

export const InsureRanges = () => {
	const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the menu
	const [selectedRowId, setSelectedRowId] = useState(null); // Selected row ID
	const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false); // Menu open state
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
	const { insurerId } = useParams();
	const { ranges, addRange } = useRange(insurerId);

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
		addRange(finalData);
		handleModalClose();
	};

	const columns = [
		{ field: "id", headerName: "ID", flex: 1 },
		{
			field: "rangeStart",
			headerName: "Valor Inicial",
			flex: 2,
			renderCell: (params) => formatCurrency(params.row.rangeStart), // Format as currency
		},
		{
			field: "rangeEnd",
			headerName: "Valor Final",
			flex: 2,
			renderCell: (params) => formatCurrency(params.row.rangeEnd), // Format as currency
		},
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
			{/* Button to open the modal to create a new insurability range */}
			<Box display="flex" justifyContent="flex-end" mb={2}>
				<Button variant="contained" color="primary" onClick={handleModalOpen}>
					Agregar Rango
				</Button>
			</Box>

			{/* Table displaying insurability ranges */}
			<Paper elevation={1}>
				<DataGrid columns={columns} rows={ranges} getRowId={(row) => row.id} />
			</Paper>

			{/* Modal to create a new insurability range */}
			<Dialog
				open={isModalOpen}
				onClose={handleModalClose}
				fullWidth
				maxWidth="sm"
			>
				<DialogTitle>Agregar Rango de Asegurabilidad</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							margin="dense"
							label="Valor Inicial"
							fullWidth
							variant="outlined"
							{...register("rangeStart", {
								required: "Valor inicial es requerido",
							})}
							error={!!errors.rangeStart}
							helperText={errors.rangeStart?.message}
							type="number"
						/>
						<TextField
							margin="dense"
							label="Valor Final"
							fullWidth
							variant="outlined"
							{...register("rangeEnd", {
								required: "Valor final es requerido",
							})}
							error={!!errors.rangeEnd}
							helperText={errors.rangeEnd?.message}
							type="number"
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
