import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRiskType } from "../../../hooks/useRiskType.jsx";
import { useParams } from "react-router-dom";
import { InsureRiskTypeForm } from "./InsureRiskTypeForm.jsx";
import { MODAL_STATES } from "../../../../../utils/constanst.js";
import { InsureRiskTypeTable } from "./InsureRiskTypeTable.jsx";

export const InsureRiskType = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [modal, setModal] = useState(MODAL_STATES.CLOSED);
	const { insurerId } = useParams();
	const { riskTypes, addRisk, updateRisk } = useRiskType(insurerId);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	const handleModalClose = () => {
		setModal(MODAL_STATES.CLOSED);
		reset({
			id: undefined,
			name: "",
			description: "",
		});
	};

	const onSubmit = (data) => {
		const finalData = {
			...data,
			insurerId: Number.parseInt(insurerId),
		};

		if (modal === MODAL_STATES.ADD) addRisk(finalData);
		if (modal === MODAL_STATES.EDIT) updateRisk(finalData);
		handleModalClose();
	};

	return (
		<Box>
			{/* Botón para crear un nuevo Risk Type */}
			<Box display="flex" justifyContent="flex-end" mb={2}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setModal(MODAL_STATES.ADD)}
				>
					Agregar Tipo de Riesgo
				</Button>
			</Box>

			{/* Tabla de Risk Types */}
			<InsureRiskTypeTable
				rows={riskTypes}
				onEdit={(row) => {
					reset({
						id: row.id,
						name: row.name,
						description: row.description,
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

			{/* Modal para agregar/editar tipo de riesgo */}
			{modal !== MODAL_STATES.CLOSED && (
				<InsureRiskTypeForm
					open={modal !== MODAL_STATES.CLOSED}
					onClose={handleModalClose}
					onSubmit={handleSubmit(onSubmit)}
					register={register}
					watch={watch}
					errors={errors}
					modalType={modal}
				/>
			)}
		</Box>
	);
};
