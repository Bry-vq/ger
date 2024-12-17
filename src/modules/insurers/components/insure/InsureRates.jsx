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
	const { rates, ranges, riskTypes, createRate } = useRate(insurerId);
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
		createRate({ ...data, insurerId });
		handleModalClose();
	};

	const columns = [
		{
			field: "riskTypeName",
			headerName: "Tipo de Riesgo",
			flex: 2,
			renderCell: (params) => params.row.riskTypeName,
		},
		{
			field: "riskTypeDescription",
			headerName: "Descripcion",
			flex: 2,
			renderCell: (params) => params.row.riskTypeDescription,
		},
		{
			field: "insurabilityRange",
			headerName: "Rango",
			flex: 2,
			renderCell: (params) =>
				formatRangeAsCurrency(params.row.insurabilityRangeText),
		},
		{
			field: "insuredValue",
			headerName: "Valor Tarifa",
			flex: 2,
			renderCell: (params) => formatCurrency(params.row.insuredValue),
		},
		{
			field: "fee",
			headerName: "Honorario Inspector",
			flex: 2,
			renderCell: (params) => formatCurrency(params.row.fee),
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
				<DataGrid columns={columns} rows={rates ?? []} />
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
								name="riskTypeId"
								control={control}
								defaultValue=""
								rules={{ required: "El tipo de riesgo es obligatorio" }}
								render={({ field }) => (
									<Select {...field} error={!!errors.riskTypeId}>
										{riskTypes.map((type, i) => (
											<MuiMenuItem key={type.value} value={type.value}>
												{console.log("type", type)}
												{type.label}
											</MuiMenuItem>
										))}
									</Select>
								)}
							/>
							{errors.riskTypeId && (
								<Box color="error.main" fontSize="small">
									{errors.riskTypeId.message}
								</Box>
							)}
						</FormControl>
						{/* Select for Insurability Range */}
						<FormControl fullWidth margin="dense">
							<InputLabel>Rango de Asegurabilidad</InputLabel>
							<Controller
								name="insurabilityRangeId"
								control={control}
								defaultValue=""
								rules={{
									required: "El rango de asegurabilidad es obligatorio",
								}}
								render={({ field }) => (
									<Select {...field} error={!!errors.insurabilityRangeId}>
										{ranges.map((range) => (
											<MuiMenuItem key={range.value} value={range.value}>
												{console.log(range)}
												{formatRangeAsCurrency(range.label)}
											</MuiMenuItem>
										))}
									</Select>
								)}
							/>
							{errors.insurabilityRangeId && (
								<Box color="error.main" fontSize="small">
									{errors.insurabilityRangeId.message}
								</Box>
							)}
						</FormControl>
						{/* Field for Insured Value */}
						<TextField
							margin="dense"
							label="Valor Tarifa"
							fullWidth
							variant="outlined"
							type="number"
							{...register("insuredValue", {
								required: "El valor de la tarifa asegurada es obligatorio",
							})}
							error={!!errors.insuredValue}
							helperText={errors.insuredValue?.message}
						/>
						{/* Field for Fee */}
						<TextField
							margin="dense"
							label="Honorario Inspector"
							fullWidth
							variant="outlined"
							type="number"
							{...register("fee", {
								required: "La tarifa del inspector es obligatoria",
							})}
							error={!!errors.fee}
							helperText={errors.fee?.message}
						/>
						{/* Dialog actions */}
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
