import * as React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { InsureDetailHeader } from "../components/insurer/insurerDetail/InsureDetailHeader.jsx";
import { IconArrowLeft } from "@tabler/icons-react";
import { InsureDetail } from "../components/insurer/insurerDetail/InsureDetail.jsx";
import { BranchesTable } from "../components/insurer/branches/InsureBranchesTable.jsx";
import { useState } from "react";

import { InsureRiskType } from "../components/insurer/riskType/InsureRiskType.jsx";
import { InsureRates } from "../components/insurer/rate/InsurerRates.jsx";
import { InsureRanges } from "../components/insurer/range/InsureRanges.jsx";
import { useInsurer } from "../hooks/useInsurers.jsx";

export const InsurerDetailPage = () => {
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
							Detalles de la Aseguradora: {insurer.name}{" "}
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
				setActiveTab={setActiveTab}
			/>

			{activeTab === 0 && <InsureDetail />}
			{activeTab === 1 && <InsureRiskType />}
			{activeTab === 2 && <InsureRanges />}
			{activeTab === 3 && <InsureRates />}
			{activeTab === 4 && <BranchesTable />}
		</Box>
	);
};
