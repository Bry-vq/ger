import * as React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { InsureDetailHeader } from "../components/insure/InsureDetailHeader.jsx";
import {
	IconFileDescription,
	IconArrowLeft,
	IconCash,
	IconBuilding,
	IconCoins,
	IconShieldLock,
} from "@tabler/icons-react";
import { InsureDetail } from "../components/insure/InsureDetail.jsx";
import { BranchesTable } from "../components/insure/InsureBranchesTable.jsx";
import { useState } from "react";
import { useInsurer } from "../hooks/useInsurer.jsx";
import { InsureRiskType } from "../components/insure/InsureRiskType.jsx";
import { InsureRanges } from "../components/insure/InsureRanges.jsx";
import { InsureRates } from "../components/insure/InsureRates.jsx";

const tabs = [
	{ title: "Detalles", icon: <IconFileDescription /> },
	{ title: "Tipos de riesgo", icon: <IconShieldLock /> },
	{ title: "Rangos de asegurabilidad", icon: <IconCoins /> },
	{ title: "Tarifas", icon: <IconCash /> },
	{ title: "Sucursales", icon: <IconBuilding /> },
];

export const InsureDetailPage = () => {
	const [activeTab, setActiveTab] = useState(0);
	const { insurerId } = useParams();
	const location = useLocation();
	const theme = useTheme();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { insurer, isInsurerFetching } = useInsurer(insurerId);

	if (isInsurerFetching) {
		return <div>Cargando...</div>;
	}
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
							Detalles de la Aseguradora: {insurer.name}
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
						</Box>
					</Box>
				</Box>
			</Box>

			<InsureDetailHeader
				userTitle="Aseguradora"
				activeTab={activeTab}
				onTabClicked={setActiveTab}
				tabs={tabs}
			/>

			{activeTab === 0 && <InsureDetail />}
			{activeTab === 1 && <InsureRiskType />}
			{activeTab === 2 && <InsureRanges />}
			{activeTab === 3 && <InsureRates />}
			{activeTab === 4 && <BranchesTable />}
		</Box>
	);
};
