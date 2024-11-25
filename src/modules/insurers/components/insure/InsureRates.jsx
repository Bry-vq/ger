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
	Select,
	MenuItem as MuiMenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import {
	formatCurrency,
	formatRangeAsCurrency,
} from "../../../../utils/functions.js";
import { useRate } from "../../hooks/useRate.jsx";
import { useParams } from "react-router-dom";

export const InsureRates = () => {
	const [anchorEl, setAnchorEl] = useState(null); // Anchor element for menu
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { insurerId } = useParams();
	const { ranges, riskTypes } = useRate(insurerId);
	const {
		register,
		control,
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
		console.log(data);
		handleModalClose();
	};

	const columns = [
		{ field: "id", headerName: "ID", flex: 1 },
		{ field: "risk_type", headerName: "Tipo de Riesgo", flex: 2 },
		{
			field: "insurability_range",
			headerName: "Rango",
			flex: 2,
			renderCell: (params) =>
				formatRangeAsCurrency(params.row.insurability_range),
		},
		{
			field: "insured_value",
			headerName: "Valor Asegurado",
			flex: 2,
			renderCell: (params) => formatCurrency(params.row.insured_value),
		},
		{
			field: "actions",
			headerName: "",
			renderCell: (params) => (
				<Box display="flex" justifyContent="center">
					<IconButton
						onClick={(event) => handleMenuOptionClick(event, params.row.value)}
					>
						<IconDotsVertical />
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={isOptionsMenuOpen && selectedRowId === params.row.value}
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
			{/* Button to open the modal */}
			<Box display="flex" justifyContent="flex-end" mb={2}>
				<Button variant="contained" color="primary" onClick={handleModalOpen}>
					Agregar Tarifa {/* Add Rate */}
				</Button>
			</Box>

			{/* Table displaying insurance rates */}
			<Paper elevation={1}>
				<DataGrid columns={columns} rows={[]} getRowId={(row) => row.value} />
			</Paper>

			{/* Modal for adding a new insurance rate */}
			<Dialog
				open={isModalOpen}
				onClose={handleModalClose}
				fullWidth
				maxWidth="sm"
			>
				<DialogTitle>Agregar Tarifa de Seguro</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* Select for Risk Type */}
						<FormControl fullWidth margin="dense">
							<InputLabel>Tipo de Riesgo</InputLabel>
							<Controller
								name="risk_type"
								control={control}
								defaultValue=""
								rules={{ required: "El tipo de riesgo es obligatorio" }}
								render={({ field }) => (
									<Select {...field} error={!!errors.risk_type}>
										{riskTypes.map((type, i) => (
											<MuiMenuItem key={type.value} value={type.value}>
												{console.log(type)}
												{type.label}
											</MuiMenuItem>
										))}
									</Select>
								)}
							/>
							{errors.risk_type && (
								<Box color="error.main" fontSize="small">
									{errors.risk_type.message}
								</Box>
							)}
						</FormControl>
						{/* Select for Insurability Range */}
						<FormControl fullWidth margin="dense">
							<InputLabel>Rango de Asegurabilidad</InputLabel>
							<Controller
								name="insurability_range"
								control={control}
								defaultValue=""
								rules={{
									required: "El rango de asegurabilidad es obligatorio",
								}}
								render={({ field }) => (
									<Select {...field} error={!!errors.insurability_range}>
										{ranges.map((range) => (
											<MuiMenuItem key={range.value} value={range.value}>
												{console.log(range)}
												{formatRangeAsCurrency(range.label)}
											</MuiMenuItem>
										))}
									</Select>
								)}
							/>
							{errors.insurability_range && (
								<Box color="error.main" fontSize="small">
									{errors.insurability_range.message}
								</Box>
							)}
						</FormControl>
						{/* Field for Insured Value */}
						<TextField
							margin="dense"
							label="Valor Asegurado"
							fullWidth
							variant="outlined"
							type="number"
							{...register("insured_value", {
								required: "El valor asegurado es obligatorio",
							})}
							error={!!errors.insured_value}
							helperText={errors.insured_value?.message}
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
