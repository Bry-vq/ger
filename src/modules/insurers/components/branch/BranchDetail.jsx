import { useState } from "react";
import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	Divider,
	Card,
	Paper,
} from "@mui/material";
import { IconInfoCircle, IconPhone } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";

export const BranchDetail = () => {
	const [activeTab, setActiveTab] = useState(0);
	const theme = useTheme();

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
							Ciudad: Bogota
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Departamento: Cundinamarca
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Dirección: Calle 123
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
			<List disablePadding>
				<ListItemButton
					selected={activeTab === 0}
					onClick={() => handleSelectTab(0)}
					sx={{
						borderRadius: `${theme.shape.borderRadius}px 0 0 0`,
						"&.Mui-selected": {
							backgroundColor: theme.palette.primary.lighter,
							color: theme.palette.primary.dark,
							borderLeft: `4px solid ${theme.palette.primary.main}`,
							boxShadow: `inset 4px 0 0 ${theme.palette.primary.main}`,
						},
					}}
				>
					<ListItemIcon>
						<IconInfoCircle color={theme.palette.primary.main} />
					</ListItemIcon>
					<ListItemText primary="Información General" />
				</ListItemButton>
			</List>

			{renderContent()}
		</Paper>
	);
};
