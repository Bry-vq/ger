import { useState } from "react";
import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	Paper,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import { IconInfoCircle, IconPhone } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";

import { useParams } from "react-router-dom";
import { IconEdit } from "@tabler/icons-react";
import { InsureForm } from "./InsureForm.jsx";
import { useForm } from "react-hook-form";
import { useInsurer } from "../../../hooks/useInsurers.jsx";

export const InsureDetail = () => {
	const theme = useTheme();
	const { insurerId } = useParams();
	const { insurer, updateInsurer } = useInsurer(insurerId);
	const [activeTab, setActiveTab] = useState(0);
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		defaultValues: {
			name: insurer.name,
			document: insurer.document,
			email: insurer.email,
			address: insurer.address,
			department: insurer.department,
			city: insurer.city,
			phone: insurer.phone,
		},
	});

	const handleFormSubmit = (data) => {
		const finalData = {
			...data,
			id: insurerId,
		};
		updateInsurer(finalData);
		setOpen(false);
		reset();
	};

	const handleSelectTab = (tabIndex) => {
		setActiveTab(tabIndex);
	};

	const renderContent = () => {
		switch (activeTab) {
			case 0:
				return (
					<Box p={3}>
						<Typography variant="h6" fontWeight="bold" gutterBottom>
							Información General
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Nombre: {insurer.name}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							NIT: {insurer.document}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Ciudad Sede Principal: {insurer.city}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Departamento Sede Principal: {insurer.department}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Dirección Sede Principal: {insurer.address}
						</Typography>
					</Box>
				);
			case 1:
				return (
					<Box p={3}>
						<Typography variant="h6" fontWeight="bold" gutterBottom>
							Contacto
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Nombre: {insurer.name}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Teléfono: {insurer.phone}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Email: {insurer.email}
						</Typography>
					</Box>
				);
			default:
				return null;
		}
	};

	return (
		<Paper
			elevation={1}
			sx={{ display: "flex", backgroundColor: theme.palette.background.paper }}
		>
			<Box
				sx={{
					borderRight: `2px solid ${theme.palette.grey[300]}`,
					boxShadow: `2px 0 5px ${theme.palette.grey[400]}`,
				}}
			>
				<List disablePadding>
					<ListItemButton
						selected={activeTab === 0}
						onClick={() => handleSelectTab(0)}
						sx={{
							borderRadius: `${theme.shape.borderRadius}px 0 0 0`,
							"&.Mui-selected": {
								backgroundColor: theme.palette.primary.lighter,
								color: theme.palette.primary.dark,
								borderLeft: `4px solid ${theme.palette.primary.main}`, // Borde lateral
								boxShadow: `inset 4px 0 0 ${theme.palette.primary.main}`, // Sombra lateral para darle un aspecto más profundo
							},
						}}
					>
						<ListItemIcon>
							<IconInfoCircle color={theme.palette.primary.main} />
						</ListItemIcon>
						<ListItemText primary="Información General" />
					</ListItemButton>

					<ListItemButton
						selected={activeTab === 1}
						onClick={() => handleSelectTab(1)}
						sx={{
							"&.Mui-selected": {
								backgroundColor: theme.palette.primary.lighter,
								color: theme.palette.primary.dark,
								borderLeft: `4px solid ${theme.palette.primary.main}`, // Borde lateral
								boxShadow: `inset 4px 0 0 ${theme.palette.primary.main}`, // Sombra lateral para darle un aspecto más profundo
							},
						}}
					>
						<ListItemIcon>
							<IconPhone color={theme.palette.primary.main} />
						</ListItemIcon>
						<ListItemText primary="Contacto" />
					</ListItemButton>
				</List>
			</Box>

			<Box flex={5} p={1} sx={{ backgroundColor: theme.palette.grey[100] }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					{renderContent()}
					<Button
						variant="text"
						sx={{
							height: 40,
							background: theme.palette.grey[300],
						}}
						onClick={() => {
							setOpen(true);
						}}
					>
						<IconEdit size={24} />
					</Button>
				</Box>
				<Dialog
					open={open}
					onClose={() => {
						setOpen(false);
						reset();
					}}
					maxWidth="md"
					fullWidth
					sx={{
						"& .MuiDialog-paper": {
							width: "50%",
							maxWidth: "none",
						},
					}}
				>
					<DialogTitle>Editar Aseguradora</DialogTitle>
					<DialogContent>
						<InsureForm
							register={register}
							watch={watch}
							errors={errors}
							setValue={setValue}
							onSubmit={handleSubmit(handleFormSubmit)}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								setOpen(false);
								reset();
							}}
							color="primary"
						>
							Cancelar
						</Button>
						<Button
							form="insure-form"
							type="submit"
							color="primary"
							variant="contained"
						>
							Guardar
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</Paper>
	);
};
