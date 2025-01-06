import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
	Box,
	Typography,
	IconButton,
	useTheme,
	Card,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import { IconArrowLeft } from "@tabler/icons-react";
import { BranchDetailHeader } from "../components/branch/BranchDetailHeader.jsx";
import { useState } from "react";
import { IconFileDescription } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { BranchDetail } from "../components/branch/BranchDetail.jsx";
import { AdvisorTable } from "../components/advisor/AdvisorTable.jsx";
import { AdvisorForm } from "../components/advisor/AdvisorForm.jsx";

const tabs = [
	{ title: "Detalles", icon: <IconFileDescription /> },
	{ title: "Asesores", icon: <IconUser /> },
];
export const BranchDetailPage = () => {
	const [activeTab, setActiveTab] = useState(0);
	const { branchId } = useParams();
	const location = useLocation();
	const theme = useTheme();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	return (
		<Box sx={{ width: "100%", minHeight: "100%", p: 3 }}>
			<Box sx={{ display: "flex", mb: 3, justifyContent: "space-between" }}>
				<Box sx={{ display: "flex" }}>
					<IconButton
						onClick={() => navigate(-1)}
						sx={{
							mr: 2,
							color: theme.palette.primary.main,
							"&:hover": { backgroundColor: theme.palette.action.hover },
						}}
					>
						<IconArrowLeft size={24} />
					</IconButton>
					<Box>
						<Typography variant="h4" fontWeight="bold">
							Detalles de la Sucursal: {branchId}
						</Typography>
						<Box sx={{ display: "flex" }}>
							<Typography
								variant="subtitle1"
								color={theme.palette.text.primary}
								fontWeight="medium"
							>
								{location.pathname.split("/")[1]}
							</Typography>
							<Typography
								variant="subtitle1"
								color={theme.palette.text.secondary}
								fontWeight="medium"
							>
								/{location.pathname.split("/")[2]}
							</Typography>
							<Typography
								variant="subtitle1"
								color={theme.palette.text.primary}
								fontWeight="medium"
							>
								/{location.pathname.split("/")[3]}
							</Typography>
							<Typography
								variant="subtitle1"
								color={theme.palette.text.secondary}
								fontWeight="medium"
							>
								/{location.pathname.split("/")[4]}
							</Typography>
						</Box>
					</Box>
				</Box>

				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpen(true)}
					sx={{ height: 40 }}
				>
					Agregar Asesor
				</Button>
			</Box>

			<BranchDetailHeader
				userTitle="Sucursal"
				activeTab={activeTab}
				onTabClicked={setActiveTab}
				tabs={tabs}
			/>

			{activeTab === 0 && <BranchDetail />}
			{activeTab === 1 && <AdvisorTable />}
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth="md" // Controla el ancho máximo
				fullWidth // Hace que el diálogo ocupe el 100% del ancho definido por `maxWidth`
				sx={{
					"& .MuiDialog-paper": {
						width: "50%", // Ocupa el 50% del ancho de la pantalla
						maxWidth: "none", // Evita que `maxWidth` sobreescriba el ancho
					},
				}}
			>
				<DialogTitle>Agregar Asesor</DialogTitle>
				<DialogContent>
					<AdvisorForm onSubmit={() => {}} />
				</DialogContent>
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
	);
};
