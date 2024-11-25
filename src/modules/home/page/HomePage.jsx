import React from "react";
import {
	Box,
	Card,
	CardActions,
	Button,
	CardContent,
	Typography,
} from "@mui/material";
import { CardList } from "../components/CardList";

export const HomePage = () => {
	return (
		<Box sx={{ width: "100%", minHeight: "100%", padding: "16px" }}>
			<Typography variant="h4" paddingBottom="16px">
				Bienvenido, Usuario
			</Typography>
			<CardList />
		</Box>
	);
};
