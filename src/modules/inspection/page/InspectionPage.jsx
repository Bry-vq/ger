import {
	Box,
	Button,
	Typography,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import { useState } from "react";
import { InspectionTable } from "../components/InspectionTable.jsx";
import { InspectionForm } from "../components/InspectionForm.jsx";
import { useInspection } from "../hooks/useInspection.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const InspectionFormSchema = yup.object().shape({
	insuredId: yup
		.number()
		.required("El asegurado es obligatorio")
		.min(1, "Seleccione un asegurado válido"),
	insuredBranchId: yup
		.number()
		.required("La sede del asegurado es obligatoria")
		.min(1, "Seleccione una sede válida"),
	insurerId: yup
		.number()
		.required("La compañía aseguradora es obligatoria")
		.min(1, "Seleccione una aseguradora válida"),
	branchId: yup
		.number()
		.required("La sucursal es obligatoria")
		.min(1, "Seleccione una sucursal válida"),
	employeeId: yup
		.number()
		.required("El inspector es obligatorio")
		.min(1, "Seleccione un inspector válido"),
	riskTypeId: yup
		.number()
		.required("El tipo de riesgo es obligatorio")
		.min(1, "Seleccione un tipo de riesgo válido"),
	applicationDate: yup
		.date()
		.required("La fecha de solicitud es obligatoria")
		.typeError("Formato de fecha inválido"),
	assignmentDate: yup
		.date()
		.required("La fecha de asignación es obligatoria")
		.typeError("Formato de fecha inválido"),
	inspectionDate: yup
		.date()
		.required("La fecha de inspección es obligatoria")
		.typeError("Formato de fecha inválido"),
	deliveryDate: yup
		.date()
		.required("La fecha de entrega es obligatoria")
		.typeError("Formato de fecha inválido"),
	totalInsuredValue: yup
		.number()
		.transform((value, originalValue) =>
			originalValue === "" ? undefined : value,
		)
		.required("El valor total asegurado es obligatorio")
		.positive("Debe ser un número positivo"),
	extraPaymentForTransport: yup
		.number()
		.transform((value, originalValue) =>
			originalValue === "" ? undefined : value,
		)
		.required("Pago extra por transporte es obligatorio")
		.min(0, "Debe ser un número positivo"),
	extraPaymentForMobilization: yup
		.number()
		.transform((value, originalValue) =>
			originalValue === "" ? undefined : value,
		)
		.required("Pago extra por movilización es obligatorio")
		.min(0, "Debe ser un número positivo"),
	extraPaymentForMaintenance: yup
		.number()
		.transform((value, originalValue) =>
			originalValue === "" ? undefined : value,
		)
		.required("Pago extra por manutención es obligatorio")
		.min(0, "Debe ser un número positivo"),
	extraPaymentForAccommodation: yup
		.number()
		.transform((value, originalValue) =>
			originalValue === "" ? undefined : value,
		)
		.required("Pago extra por alojamiento es obligatorio")
		.min(0, "Debe ser un número positivo"),
	differentiatedPayment: yup
		.number()
		.transform((value, originalValue) =>
			originalValue === "" ? undefined : value,
		)
		.required("El pago diferenciado es obligatorio")
		.min(0, "Debe ser un número positivo"),
	comments: yup
		.string()
		.nullable()
		.max(500, "Los comentarios no pueden superar los 500 caracteres"),
});

export const InspectionPage = () => {
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		control,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(InspectionFormSchema),
		defaultValues: {
			insuredId: "",
			insuredBranchId: "",
			insurerId: "",
			branchId: "",
			employeeId: "",
			applicationDate: "",
			assignmentDate: "",
			inspectionDate: "",
			deliveryDate: "",
			deliveryDateToInsurer: "",
			riskTypeId: "",
			totalInsuredValue: "",
			extraPaymentForTransport: "",
			extraPaymentForMobilization: "",
			extraPaymentForMaintenance: "",
			extraPaymentForAccommodation: "",
			differentiatedPayment: "",
			comments: "",
		},
	});

	const insurerId = watch("insurerId");
	const insuredId = watch("insuredId");
	const riskTypeId = watch("riskTypeId");
	const totalInsuredValue = watch("totalInsuredValue");

	const {
		inspections,
		addInspection,
		insurersSelect,
		insurerBranchesSelect,
		insuredsSelect,
		insuredBranchesSelect,
		employeesSelect,
		riskTypesSelect,
		ratesByRisk,
	} = useInspection(open, insurerId, insuredId, riskTypeId);

	const handleFormSubmit = (data) => {
		console.log(data);
		addInspection(data);
		reset();
		setOpen(false);
	};

	return (
		<Box sx={{ width: "100%", minHeight: "100%", p: 3 }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					mb: 3,
				}}
			>
				<Typography variant="h4" fontWeight="bold">
					Inspecciones
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpen(true)}
					sx={{ height: 40 }}
				>
					Nueva Inspección
				</Button>
			</Box>

			<InspectionTable data={inspections} />

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth="md" // Controla el ancho máximo
				fullWidth // Hace que el diálogo ocupe el 100% del ancho definido por `maxWidth`
				sx={{
					"& .MuiDialog-paper": {
						width: "80%", // Ocupa el 50% del ancho de la pantalla
						maxWidth: "none", // Evita que `maxWidth` sobreescriba el ancho
					},
				}}
			>
				<DialogTitle>Agregar Inspección</DialogTitle>
				<DialogContent>
					<InspectionForm
						watch={watch}
						register={register}
						control={control}
						setValue={setValue}
						errors={errors}
						onSubmit={handleSubmit(handleFormSubmit)}
						insurersSelect={insurersSelect}
						insurerBranchesSelect={insurerBranchesSelect}
						insuredsSelect={insuredsSelect}
						employeesSelect={employeesSelect}
						riskTypesSelect={riskTypesSelect}
						insuredBranchesSelect={insuredBranchesSelect}
						ratesByRisk={ratesByRisk}
						totalInsuredValue={totalInsuredValue}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">
						Cancelar
					</Button>
					<Button
						form="inspection-form"
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
