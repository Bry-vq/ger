import { BranchDetailHeader } from "../components/branch/BranchDetailHeader.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AdvisorTable } from "../components/advisor/AdvisorTable.jsx";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { BranchDetail } from "../components/branch/BranchDetail.jsx";
import { IconFileDescription } from "@tabler/icons-react";
import { IconArrowLeft } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { useState } from "react";

const tabs = [
	{ title: "Detalles", icon: <IconFileDescription /> },
	{ title: "Asesores", icon: <IconUser /> },
];

export const BranchDetailPage = () => {
	const [activeTab, setActiveTab] = useState(0);
	const { branchId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();

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
			</Box>

			<BranchDetailHeader
				userTitle="Sucursal"
				activeTab={activeTab}
				onTabClicked={setActiveTab}
				tabs={tabs}
			/>

			{activeTab === 0 && <BranchDetail />}
			{activeTab === 1 && <AdvisorTable />}
		</Box>
	);
};
