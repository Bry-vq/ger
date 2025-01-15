import {
	Box,
	ListItemText,
	Paper,
	Stack,
	Tab,
	Tabs,
	Typography,
	useTheme,
} from "@mui/material";
import React from "react";

function a11yProps(index) {
	return {
		id: `tab-${index}`,
		"aria-controls": `tabpanel-${index}`,
	};
}

export const InsuredDetailHeader = ({
	userTitle,
	userSubtitle,
	onTabClicked,
	tabs,
	activeTab,
}) => {
	const theme = useTheme();

	const handleTabChange = (event, newValue) => {
		onTabClicked(newValue);
	};

	return (
		<Paper
			elevation={2}
			sx={{
				height: 150,
				position: "relative",
				mb: 3,
				color: theme.palette.common.white,
				overflow: "hidden",
			}}
		>
			<Box
				sx={{
					height: "100%",
					padding: 0,
					background: theme.palette.primary.main,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<Stack direction="row" sx={{ p: 3 }}>
					<ListItemText>
						<Typography variant="h5">{userTitle}</Typography>
						{userSubtitle && (
							<Typography variant="subtitle1" color={theme.palette.grey[500]}>
								{userSubtitle}
							</Typography>
						)}
					</ListItemText>
				</Stack>

				<Box
					position="absolute"
					bottom={0}
					sx={{
						width: "100%",
						borderRadius: `0 0 ${theme.shape.borderRadius} ${theme.shape.borderRadius}`,
						backgroundColor: theme.palette.common.white,
					}}
				>
					<Tabs
						variant="standard"
						value={activeTab}
						onChange={handleTabChange}
						aria-label="Tabs in InsureDetailHeader"
						sx={{ display: "flex", justifyContent: "flex-end", float: "right" }}
					>
						{tabs.map((tab, index) => (
							<Tab
								key={tab.title}
								label={
									<Box sx={{ display: "flex", alignItems: "center" }}>
										<Box mr={1}>{tab.icon}</Box>
										{tab.title}
									</Box>
								}
								{...a11yProps(index)}
							/>
						))}
					</Tabs>
				</Box>
			</Box>
		</Paper>
	);
};
