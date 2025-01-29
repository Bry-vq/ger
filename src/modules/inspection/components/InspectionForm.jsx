import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { formatCurrency } from "../../../utils/functions.js";
import { NumericFormat } from "react-number-format";

export const InspectionForm = ({
	insurersSelect,
	insurerBranchesSelect,
	insuredsSelect,
	insuredBranchesSelect,
	employeesSelect,
	riskTypesSelect,
	ratesByRisk,
	totalInsuredValue,
	watch,
	register,
	control,
	setValue,
	errors,
	onSubmit,
}) => {
	const [calculatedRate, setCalculatedRate] = useState(null);

	useEffect(() => {
		if (ratesByRisk && totalInsuredValue > 0) {
			const rate = ratesByRisk.find(
				(rate) =>
					totalInsuredValue >= rate.insurabilityRange.rangeStart &&
					totalInsuredValue <= rate.insurabilityRange.rangeEnd,
			);
			setCalculatedRate(rate || null);

			if (rate) {
				setValue("insurerRateId", rate.id, { shouldValidate: true });
			} else {
				setValue("insurerRateId", null, { shouldValidate: true });
			}
		} else {
			setCalculatedRate(null);
			setValue("insurerRateId", null, { shouldValidate: true });
		}
	}, [ratesByRisk, totalInsuredValue, setValue]);

	return (
		<form id="inspection-form" onSubmit={onSubmit}>
			{/* Compañía Asesora (JAC, IAR)*/}
			<FormControl
				fullWidth
				margin="dense"
				error={!!errors.insuredId}
				sx={{ mb: 2, mt: 1 }}
			>
				<InputLabel id="simple-select-label-insured">
					Compañía Asesora
				</InputLabel>
				<Controller
					name="advisorCompany"
					labelId="simple-select-label-insured"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							label="Compañía Asesora"
							error={!!errors.advisorCompany}
						>
							<MenuItem key={1} value={"JAC"}>
								JAC
							</MenuItem>
							<MenuItem key={2} value={"IAR"}>
								IAR
							</MenuItem>
						</Select>
					)}
				/>
				{errors.advisorCompany && (
					<Typography color="error.main" fontSize="small">
						{errors.advisorCompany.message}
					</Typography>
				)}
			</FormControl>

			{/* Servicio Asignado (Select con INSPECCION, REINSPECCION, CAPACITACION, SEGUIMIENTO A RECOMENDACIONES, IRV - INSPECCION REMOTA POR VIDEO) */}
			<FormControl
				fullWidth
				margin="dense"
				error={!!errors.serviceAssigned}
				sx={{ mb: 2 }}
			>
				<InputLabel id="simple-select-label-service">
					Servicio Asignado
				</InputLabel>
				<Controller
					name="serviceAssigned"
					labelId="simple-select-label-service"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							label="Servicio Asignado"
							error={!!errors.serviceAssigned}
						>
							<MenuItem key={1} value={"INSPECCION"}>
								INSPECCION
							</MenuItem>
							<MenuItem key={2} value={"REINSPECCION"}>
								REINSPECCION
							</MenuItem>
							<MenuItem key={3} value={"CAPACITACION"}>
								CAPACITACION
							</MenuItem>
							<MenuItem key={4} value={"SEGUIMIENTO A RECOMENDACIONES"}>
								SEGUIMIENTO A RECOMENDACIONES
							</MenuItem>
							<MenuItem key={5} value={"IRV - INSPECCION REMOTA POR VIDEO"}>
								IRV - INSPECCION REMOTA POR VIDEO
							</MenuItem>
						</Select>
					)}
				/>
			</FormControl>

			{/* Número de Póliza */}
			<TextField
				fullWidth
				label="Número de Póliza"
				variant="outlined"
				type="number"
				sx={{ mb: 2 }}
				{...register("policyNumber")}
				error={!!errors.policyNumber}
				helperText={errors.policyNumber?.message}
			/>

			{/* Tipo de Trabajo (Select con INSPECCION ESTANDAR, RUTA 21} */}
			<FormControl
				fullWidth
				margin="dense"
				error={!!errors.jobType}
				sx={{ mb: 2 }}
			>
				<InputLabel id="simple-select-label-job">Tipo de Trabajo</InputLabel>
				<Controller
					name="jobType"
					labelId="simple-select-label-job"
					control={control}
					render={({ field }) => (
						<Select {...field} label="Tipo de Trabajo" error={!!errors.jobType}>
							<MenuItem key={1} value={"INSPECCION ESTANDAR"}>
								INSPECCION ESTANDAR
							</MenuItem>
							<MenuItem key={2} value={"RUTA 21"}>
								RUTA 21
							</MenuItem>
						</Select>
					)}
				/>
			</FormControl>

			{/* Código de Intermediario */}
			<TextField
				fullWidth
				label="Código de Intermediario"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("intermediaryCode")}
				error={!!errors.intermediaryCode}
				helperText={errors.intermediaryCode?.message}
			/>

			{/* Inspector */}
			<FormControl
				fullWidth
				margin="dense"
				error={!!errors.employeeId}
				sx={{ mb: 2, mt: 0 }}
			>
				<InputLabel id="simple-select-label-employee">Inspector</InputLabel>
				<Controller
					name="employeeId"
					labelId="simple-select-label-employee"
					control={control}
					render={({ field }) => (
						<Select {...field} label="Inspector" error={!!errors.employeeId}>
							{employeesSelect?.map((employee) => (
								<MenuItem key={employee.value} value={employee.value}>
									{employee.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				{errors.employeeId && (
					<Typography color="error.main" fontSize="small">
						{errors.employeeId.message}
					</Typography>
				)}
			</FormControl>

			{/* Asegurado */}
			<FormControl
				fullWidth
				margin="dense"
				error={!!errors.insuredId}
				sx={{ mb: 2, mt: 1 }}
			>
				<InputLabel id="simple-select-label-insured">Asegurado</InputLabel>
				<Controller
					name="insuredId"
					labelId="simple-select-label-insured"
					control={control}
					render={({ field }) => (
						<Select {...field} label="Asegurado" error={!!errors.insuredId}>
							{insuredsSelect?.map((insured) => (
								<MenuItem key={insured.value} value={insured.value}>
									{insured.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				{errors.insuredId && (
					<Typography color="error.main" fontSize="small">
						{errors.insuredId.message}
					</Typography>
				)}
			</FormControl>

			{/* Sede Asegurado */}
			<FormControl
				fullWidth
				margin="dense"
				error={!!errors.insuredBranchId}
				sx={{ mb: 2, mt: 1 }}
			>
				<InputLabel id="simple-select-label-insured-branch">
					Sede Solicitud Asegurado
				</InputLabel>
				<Controller
					name="insuredBranchId"
					labelId="simple-select-label-insured-branch"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							label="Sede Solicitud Asegurado"
							error={!!errors.insuredBranchId}
						>
							{insuredBranchesSelect?.map((insuredBranch) => (
								<MenuItem key={insuredBranch.value} value={insuredBranch.value}>
									{insuredBranch.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				{errors.insuredBranchId && (
					<Typography color="error.main" fontSize="small">
						{errors.insuredBranchId.message}
					</Typography>
				)}
			</FormControl>

			{/* Compañía Aseguradora */}
			<FormControl
				fullWidth
				margin="dense"
				error={!!errors.insurerId}
				sx={{ mb: 2, mt: 0 }}
			>
				<InputLabel id="simple-select-label-insurer">
					Compañía Aseguradora
				</InputLabel>
				<Controller
					name="insurerId"
					labelId="simple-select-label-insurer"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							label="Compañía Aseguradora"
							error={!!errors.insurerId}
						>
							{insurersSelect?.map((insurer) => (
								<MenuItem key={insurer.value} value={insurer.value}>
									{insurer.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				{errors.insurerId && (
					<Typography color="error.main" fontSize="small">
						{errors.insurerId.message}
					</Typography>
				)}
			</FormControl>

			{/* Sucursal */}
			<FormControl
				fullWidth
				margin="dense"
				error={!!errors.branchId}
				sx={{ mb: 2, mt: 0 }}
			>
				<InputLabel id="simple-select-label-branch">Sucursal</InputLabel>
				<Controller
					name="branchId"
					labelId="simple-select-label-branch"
					control={control}
					render={({ field }) => (
						<Select {...field} label="Sucursal" error={!!errors.branchId}>
							{insurerBranchesSelect?.map((branch) => (
								<MenuItem key={branch.value} value={branch.value}>
									{branch.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				{errors.branchId && (
					<Typography color="error.main" fontSize="small">
						{errors.branchId.message}
					</Typography>
				)}
			</FormControl>

			{/* Centro de Costo */}
			<TextField
				fullWidth
				label="Centro de Costo/Código de Sucursal"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("costCenter")}
				error={!!errors.costCenter}
				helperText={errors.costCenter?.message}
			/>

			{/* Campos de fechas */}
			<TextField
				fullWidth
				label="Fecha de Solicitud"
				type="date"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("applicationDate")}
				error={!!errors.applicationDate}
				helperText={errors.applicationDate?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>
			<TextField
				fullWidth
				label="Fecha de Asignación"
				variant="outlined"
				type="date"
				sx={{ mb: 2 }}
				{...register("assignmentDate")}
				error={!!errors.assignmentDate}
				helperText={errors.assignmentDate?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>
			<TextField
				fullWidth
				label="Fecha de Inspección"
				variant="outlined"
				type="date"
				sx={{ mb: 2 }}
				{...register("inspectionDate")}
				error={!!errors.inspectionDate}
				helperText={errors.inspectionDate?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>
			<TextField
				fullWidth
				label="Fecha de Entrega del Inspector"
				variant="outlined"
				type="date"
				sx={{ mb: 2 }}
				{...register("deliveryDateInspector")}
				error={!!errors.deliveryDateInspector}
				helperText={errors.deliveryDateInspector?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>

			<TextField
				fullWidth
				label="Fecha de Entrega a la Aseguradora"
				variant="outlined"
				type="date"
				sx={{ mb: 2 }}
				{...register("deliveryDateToInsurer")}
				error={!!errors.deliveryDateToInsurer}
				helperText={errors.deliveryDateToInsurer?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>

			{/* Código CIIU */}
			<TextField
				fullWidth
				label="Código CIIU"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("ciiuCode")}
				error={!!errors.ciiuCode}
				helperText={errors.ciiuCode?.message}
			/>

			{/* Descripción CIIU */}
			<TextField
				fullWidth
				label="Descripción CIIU"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("ciiuDescription")}
				error={!!errors.ciiuDescription}
				helperText={errors.ciiuDescription?.message}
			/>

			{/* Coordenadas */}
			<TextField
				fullWidth
				label="Coordenadas (Longitud, Latitud)"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("coordinates")}
				error={!!errors.coordinates}
				helperText={errors.coordinates?.message}
			/>

			{/* Tipo de Construcción */}

			{/* Año de Construcción */}
			<TextField
				fullWidth
				label="Año de Construcción"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("constructionYear")}
				error={!!errors.constructionYear}
				helperText={errors.constructionYear?.message}
			/>

			{/* Número de Pisos */}
			<TextField
				fullWidth
				label="Número de Pisos"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("floorsNumber")}
				error={!!errors.floorsNumber}
				helperText={errors.floorsNumber?.message}
			/>

			{/* Técnico ANS */}
			<TextField
				fullWidth
				label="Técnico ANS"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("tecnincANS")}
				error={!!errors.ansTechnician}
				helperText={errors.ansTechnician?.message}
			/>

			{/* Retraso ANS */}
			<TextField
				fullWidth
				label="Retraso ANS"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("delayANS")}
				error={!!errors.ansDelay}
				helperText={errors.delayANS?.message}
			/>

			{/* Gastos - Cobro de viaticos a la aseguradora*/}
			<TextField
				fullWidth
				label="Gastos"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("expenses")}
				error={!!errors.expenses}
				helperText={errors.expenses?.message}
			/>

			{/* Viaticos - Pago de viaticos al inspector */}
			<TextField
				fullWidth
				label="Viáticos"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("travelExpenses")}
				error={!!errors.travelExpenses}
				helperText={errors.travelExpenses?.message}
			/>

			{/* Estado de viaticos - (No hay viaticos, pagados, por pagar)*/}
			<FormControl
				fullWidth
				margin="dense"
				error={!!errors.travelExpensesStatus}
				sx={{ mb: 2 }}
			>
				<InputLabel id="simple-select-label-travel-expenses-status">
					Estado de Viáticos
				</InputLabel>
				<Controller
					name="travelExpensesStatus"
					labelId="simple-select-label-travel-expenses-status"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							label="Estado de Viáticos"
							error={!!errors.travelExpensesStatus}
						>
							<MenuItem key={1} value={"NO HAY VIATICOS"}>
								NO HAY VIATICOS
							</MenuItem>
							<MenuItem key={2} value={"PAGADOS"}>
								PAGADOS
							</MenuItem>
							<MenuItem key={3} value={"POR PAGAR"}>
								POR PAGAR
							</MenuItem>
						</Select>
					)}
				/>
			</FormControl>

			{/* Tipo de Riesgo */}
			<FormControl
				fullWidth
				margin="dense"
				sx={{ mb: 2, mt: 0 }}
				error={!!errors.riskTypeId}
			>
				<InputLabel id="simple-select-label-employee">
					Tipo de Riesgo
				</InputLabel>
				<Controller
					name="riskTypeId"
					labelId="simple-select-label-employee"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							label="Tipo de Riesgo"
							error={!!errors.riskTypeId}
						>
							{riskTypesSelect?.map((riskType) => (
								<MenuItem key={riskType.value} value={riskType.value}>
									{riskType.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				{errors.riskTypeId && (
					<Typography color="error.main" fontSize="small">
						{errors.riskTypeId.message}
					</Typography>
				)}
			</FormControl>

			{/* Valor Asegurado */}
			<Controller
				name="totalInsuredValue"
				control={control}
				render={({ field: { onChange, onBlur, value, ref } }) => (
					<NumericFormat
						value={value}
						onValueChange={(values) => {
							const { floatValue } = values;
							onChange(floatValue);
						}}
						thousandSeparator=","
						decimalSeparator="."
						prefix="$ "
						customInput={TextField}
						fullWidth
						label="Valor Asegurado"
						variant="outlined"
						sx={{ mb: 2 }}
						error={!!errors.totalInsuredValue}
						helperText={errors.totalInsuredValue?.message}
					/>
				)}
			/>
			{/* Tarifa */}
			<TextField
				fullWidth
				label="Tarifa"
				variant="outlined"
				sx={{ mb: 2 }}
				disabled
				value={
					calculatedRate
						? `Rango: ${formatCurrency(calculatedRate.insurabilityRange.rangeStart)} - ${formatCurrency(calculatedRate.insurabilityRange.rangeEnd)}`
						: "Sin tarifa aplicable"
				}
			/>

			{/* Pago Diferenciado */}
			<TextField
				fullWidth
				label="Pago Diferenciado"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("differentiatedPayment")}
				error={!!errors.differentiatedPayment}
				helperText={errors.differentiatedPayment?.message}
			/>

			{/* Comentarios */}
			<TextField
				fullWidth
				label="Comentarios"
				variant="outlined"
				multiline
				rows={4}
				sx={{ mb: 2 }}
				{...register("comments")}
				error={!!errors.comments}
				helperText={errors.comments?.message}
			/>
		</form>
	);
};
