import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const InsuredDetailPage = () => {
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
							Detalles del Asegurado
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
		</Box>
	);
};
