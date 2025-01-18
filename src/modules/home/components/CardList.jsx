import React from "react";
import { Box, Card, Typography } from "@mui/material";
export const CardList = () => {
	return (
		<Box sx={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
			<Card sx={{ padding: "8px", width: "100%" }}>
				<Typography variant="h6">Titulo 1</Typography>
				<Typography variant="body2" color="text.secondary">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
				</Typography>
			</Card>
			<Card sx={{ padding: "8px", width: "100%" }}>
				<Typography variant="h6">Titulo 2</Typography>
				<Typography variant="body2" color="text.secondary">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
				</Typography>
			</Card>
			<Card sx={{ padding: "8px", width: "100%" }}>
				<Typography variant="h6">Titulo 3</Typography>
				<Typography variant="body2" color="text.secondary">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
				</Typography>
			</Card>
		</Box>
	);
};
