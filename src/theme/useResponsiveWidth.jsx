import { useTheme, useMediaQuery } from "@mui/material";

export const useResponsiveWidth = () => {
	const theme = useTheme();

	// Evaluar los puntos de quiebre
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Dispositivo pequeño
	const isMediumScreen = useMediaQuery(theme.breakpoints.down("md")); // Dispositivo mediano

	// Determinar el ancho dinámicamente basado en los puntos de quiebre
	const getWidth = () => {
		if (isSmallScreen) return "90%"; // Ancho para pantallas pequeñas
		if (isMediumScreen) return "80%"; // Ancho para pantallas medianas
		return "50%"; // Ancho para pantallas grandes
	};

	return getWidth(); // Retorna el ancho dinámico
};
