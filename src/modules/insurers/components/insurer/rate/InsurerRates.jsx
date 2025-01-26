import { Box, Button, IconButton, Menu, MenuItem, Paper } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import { formatCurrency } from "../../../../../utils/functions.js";
import { useRate } from "../../../hooks/useRate.jsx";
import { useParams } from "react-router-dom";
import { MODAL_STATES } from "../../../../../utils/constanst.js";
import { InsurerRateForm } from "./InsurerRateForm.jsx";

export const InsureRates = () => {
	const [anchorEl, setAnchorEl] = useState(null); // Anchor element for menu
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
	const [modal, setModal] = useState(MODAL_STATES.CLOSED);
	const { insurerId } = useParams();
	const { rates, ranges, riskTypes, createRate, updateRate } =
		useRate(insurerId);
	const {
		watch,
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

	const handleModalClose = () => {
		setModal(MODAL_STATES.CLOSED);
		reset({
			id: undefined,
			riskTypeId: "",
			insuredValue: "",
			fee: "",
			year: "",
		});
	};

	const onSubmit = (data) => {
		const finalData = {
			...data,
			insurerId: Number.parseInt(insurerId),
		};
		console.log(finalData);
		if (modal === MODAL_STATES.ADD) createRate(finalData);
		if (modal === MODAL_STATES.EDIT) updateRate(finalData);
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
			renderCell: (params) => params.row.insurabilityRangeText,
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
			field: "year",
			headerName: "Año de Tarifa",
			flex: 2,
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
						<MenuItem
							onClick={() => {
								reset({
									id: params.row.id,
									riskTypeId: params.row.riskTypeId,
									insurabilityRangeId: params.row.insurabilityRangeId,
									insuredValue: params.row.insuredValue,
									fee: params.row.fee,
									year: params.row.year,
								});
								setModal(MODAL_STATES.EDIT);
								handleMenuOptionClose();
							}}
						>
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
				<Button
					variant="contained"
					color="primary"
					onClick={() => setModal(MODAL_STATES.ADD)}
				>
					Agregar Tarifa
				</Button>
			</Box>

			{/* Table displaying insurance rates */}
			<Paper elevation={1}>
				<DataGrid columns={columns} rows={rates ?? []} />
			</Paper>

			{/* Modal for adding a new insurance rate */}
			{modal !== MODAL_STATES.CLOSED && (
				<InsurerRateForm
					open={modal !== MODAL_STATES.CLOSED}
					onClose={handleModalClose}
					onSubmit={handleSubmit(onSubmit)}
					control={control}
					register={register}
					errors={errors}
					watch={watch}
					ranges={ranges}
					riskTypes={riskTypes}
				/>
			)}
		</Box>
	);
};
