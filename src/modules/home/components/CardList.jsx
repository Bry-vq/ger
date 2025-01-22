import { Box, Card, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const CardList = () => {
	return (
		<Box
			sx={{
				padding: "16px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				minHeight: "100vh",
				paddingTop: "100px",
			}}
		>
			<Box sx={{ maxWidth: "1200px", width: "100%" }}>
				<Typography
					variant="h4"
					gutterBottom
					sx={{
						fontWeight: "bold",
						color: "primary.main",
						textAlign: "center",
						textTransform: "uppercase",
						marginBottom: "24px",
					}}
				>
					Panel de Control
				</Typography>
				<Box sx={{ textAlign: "center", marginTop: "24px" }}>
					<Typography
						variant="h6"
						color="text.primary"
						sx={{ textAlign: "center", marginBottom: "24px" }}
					>
						Informes de Inspección Pendientes
					</Typography>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "center",
							gap: "16px",
						}}
					>
						{LAST_INSPECTIONS.map((inspection, index) => (
							<Box
								key={index}
								sx={{
									width: {
										xs: "100%",
										sm: "calc(50% - 16px)",
										md: "calc(33.33% - 16px)",
									},
									marginBottom: "16px",
								}}
							>
								<Card
									sx={{
										padding: "16px",
										boxShadow: 3,
										animation: `${fadeIn} 1s ease-in-out`,
										backgroundColor: "#ffffff",
										borderLeft: "4px solid #1976d2",
										"&:hover": {
											transform: "scale(1.05)",
											transition: "transform 0.3s ease-in-out",
											backgroundColor: "#f5f5f5",
										},
									}}
								>
									<Typography variant="body1" color="text.primary">
										{inspection.date}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{inspection.description}
									</Typography>
								</Card>
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

const LAST_INSPECTIONS = [
	{
		date: "01/10/2023",
		description: "Inspección de seguridad en el edificio A",
	},
	{
		date: "15/09/2023",
		description: "Inspección de mantenimiento en el edificio B",
	},
	{
		date: "30/08/2023",
		description: "Inspección de incendios en el edificio C",
	},
	{
		date: "01/10/2023",
		description: "Inspección de seguridad en el edificio A",
	},
	{
		date: "15/09/2023",
		description: "Inspección de mantenimiento en el edificio B",
	},
	{
		date: "30/08/2023",
		description: "Inspección de incendios en el edificio C",
	},
	{
		date: "01/10/2023",
		description: "Inspección de seguridad en el edificio A",
	},
	{
		date: "15/09/2023",
		description: "Inspección de mantenimiento en el edificio B",
	},
	{
		date: "30/08/2023",
		description: "Inspección de incendios en el edificio C",
	},
];
