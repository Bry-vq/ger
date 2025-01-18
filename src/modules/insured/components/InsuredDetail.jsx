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
import { useInsured } from "../hooks/useInsured.jsx";

export const InsuredDetail = () => {
	const theme = useTheme();
	const { insuredId } = useParams();
	const [activeTab, setActiveTab] = useState(0);
	const [open, setOpen] = useState(false);
	const { insured } = useInsured(insuredId);

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
							Nombre: {insured?.name}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							NIT: {insured?.document}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Ciudad Sede Principal: {insured?.city}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Departamento Sede Principal: {insured?.department}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Dirección Sede Principal: {insured?.address}
						</Typography>
					</Box>
				);
			case 1:
				return (
					<Box p={3}>
						<Typography variant="body1" color="text.secondary">
							Nombre: {insured?.name}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Teléfono: {insured?.phone}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Email: {insured?.email}
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

			<Box flex={5} p={3} sx={{ backgroundColor: theme.palette.grey[100] }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					{renderContent()}
					<Button
						variant="contained"
						sx={{ height: 40 }}
						onClick={() => {
							setOpen(true);
						}}
					>
						Editar
					</Button>
				</Box>
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
					maxWidth="md"
					fullWidth
					sx={{
						"& .MuiDialog-paper": {
							width: "50%",
							maxWidth: "none",
						},
					}}
				>
					<DialogTitle>Editar Asegurado</DialogTitle>
					<DialogContent>Aqui sera el modal de editar</DialogContent>
					<DialogActions>
						<Button onClick={() => setOpen(false)} color="primary">
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
