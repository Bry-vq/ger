import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const InspectionForm = ({ register, control, errors, onSubmit }) => {
	console.log("errors", errors);
	return (
		<form id="inspection-form" onSubmit={onSubmit}>
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
							<MenuItem key={0} value={0}>
								Option
							</MenuItem>
							<MenuItem key={1} value={2}>
								Option2
							</MenuItem>
						</Select>
					)}
				/>
				{errors.insuredId && (
					<Typography color="error.main" fontSize="small">
						{errors.insuredId.message}
					</Typography>
				)}
			</FormControl>

			{/* Sede Solicitud Asegurado */}
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
							<MenuItem key={0} value={0}>
								Option
							</MenuItem>
							<MenuItem key={1} value={2}>
								Option2
							</MenuItem>
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
							<MenuItem key={0} value={0}>
								Option
							</MenuItem>
							<MenuItem key={1} value={2}>
								Option2
							</MenuItem>
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
							<MenuItem key={0} value={0}>
								Option
							</MenuItem>
							<MenuItem key={1} value={2}>
								Option2
							</MenuItem>
						</Select>
					)}
				/>
				{errors.branchId && (
					<Typography color="error.main" fontSize="small">
						{errors.branchId.message}
					</Typography>
				)}
			</FormControl>

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
							<MenuItem key={0} value={0}>
								Option
							</MenuItem>
							<MenuItem key={1} value={2}>
								Option2
							</MenuItem>
						</Select>
					)}
				/>
				{errors.employeeId && (
					<Typography color="error.main" fontSize="small">
						{errors.employeeId.message}
					</Typography>
				)}
			</FormControl>
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
				label="Fecha de Entrega"
				variant="outlined"
				type="date"
				sx={{ mb: 2 }}
				{...register("deliveryDate")}
				error={!!errors.deliveryDate}
				helperText={errors.deliveryDate?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>
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
							<MenuItem key={0} value={0}>
								Option
							</MenuItem>
							<MenuItem key={1} value={2}>
								Option2
							</MenuItem>
						</Select>
					)}
				/>
				{errors.riskTypeId && (
					<Typography color="error.main" fontSize="small">
						{errors.riskTypeId.message}
					</Typography>
				)}
			</FormControl>
			<TextField
				fullWidth
				label="Valor Total Asegurado"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("totalInsuredValue")}
				error={!!errors.totalInsuredValue}
				helperText={errors.totalInsuredValue?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>
			<TextField fullWidth label="Tarifa" variant="outlined" sx={{ mb: 2 }} />
			<TextField
				fullWidth
				label="Tarifa"
				variant="outlined"
				sx={{ mb: 2 }}
				disabled
			/>
			<TextField
				fullWidth
				label="Pago Extra por Transporte"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("extraPaymentForTransport")}
				error={!!errors.extraPaymentForTransport}
				helperText={errors.extraPaymentForTransport?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>
			<TextField
				fullWidth
				label="Pago Extra por Movilización"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("extraPaymentForMobilization")}
				error={!!errors.extraPaymentForMobilization}
				helperText={errors.extraPaymentForMobilization?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>
			<TextField
				fullWidth
				label="Pago Extra por Manutención"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("extraPaymentForMaintenance")}
				error={!!errors.extraPaymentForMaintenance}
				helperText={errors.extraPaymentForMaintenance?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>
			<TextField
				fullWidth
				label="Pago Extra por Alojamiento"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("extraPaymentForAccommodation")}
				error={!!errors.extraPaymentForAccommodation}
				helperText={errors.extraPaymentForAccommodation?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>
			<TextField
				fullWidth
				label="Pago Diferenciado"
				variant="outlined"
				sx={{ mb: 2 }}
				{...register("differentiatedPayment")}
				error={!!errors.differentiatedPayment}
				helperText={errors.differentiatedPayment?.message}
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>
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
				slotProps={{
					inputLabel: { shrink: true },
				}}
			/>
		</form>
	);
};
