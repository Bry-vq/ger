import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRange } from "../../hooks/useRange.jsx";
import { useParams } from "react-router-dom";
import { InsureRangesTable } from "./InsureRangesTable.jsx";
import { InsureRangesForm } from "./InsureRangesForm.jsx";

// Definimos constantes para el estado del modal
const MODAL_STATES = {
	ADD: "add",
	EDIT: "edit",
	CLOSED: "closed",
};

export const InsureRanges = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [modal, setModal] = useState(MODAL_STATES.CLOSED);
	const { insurerId } = useParams();
	const { ranges, addRange, updateRange } = useRange(insurerId);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const handleModalClose = () => {
		setModal(MODAL_STATES.CLOSED);
		reset({
			id: undefined,
			rangeStart: "",
			rangeEnd: "",
		});
	};

	const onSubmit = (data) => {
		const finalData = {
			...data,
			insurerId: Number.parseInt(insurerId),
		};
		if (modal === MODAL_STATES.ADD) addRange(finalData);
		if (modal === MODAL_STATES.EDIT) updateRange(finalData);
		handleModalClose();
	};

	return (
		<Box>
			{/* Botón para crear un nuevo rango */}
			<Box display="flex" justifyContent="flex-end" mb={2}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setModal(MODAL_STATES.ADD)}
				>
					Agregar Rango
				</Button>
			</Box>

			{/* Tabla de Ranges */}
			<InsureRangesTable
				rows={ranges}
				onEdit={(row) => {
					reset({
						id: row.id,
						rangeStart: row.rangeStart,
						rangeEnd: row.rangeEnd,
					});
					setModal(MODAL_STATES.EDIT);
				}}
				setAnchorEl={setAnchorEl}
				anchorEl={anchorEl}
				isOptionsMenuOpen={Boolean(anchorEl)}
				selectedRowId={selectedRowId}
				onCloseMenu={() => setAnchorEl(null)}
				setSelectedRowId={setSelectedRowId}
			/>

			{/* Modal para agregar/editar rango */}
			{modal !== MODAL_STATES.CLOSED && (
				<InsureRangesForm
					open={modal !== MODAL_STATES.CLOSED}
					onClose={handleModalClose}
					onSubmit={handleSubmit(onSubmit)}
					register={register}
					errors={errors}
					modalType={modal}
				/>
			)}
		</Box>
	);
};
