import { Box, Card, Typography, Grid, Avatar, Hidden } from "@mui/material";
import {
  AccountBalance,
  Assessment,
  Security,
  Settings,
} from "@mui/icons-material";
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
        <Grid container spacing={1} justifyContent="center">
          {ACTIONS.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card
                sx={{
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  animation: `${fadeIn} 1s ease-in-out`,
                  boxShadow: 3,
                  backgroundColor: "#ffffff",
                  borderLeft: `4px solid ${item.color}`,
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Avatar sx={{ bgcolor: item.color, marginRight: "16px" }}>
                  {item.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: item.color }}>
                    {item.title}
                  </Typography>
                  <Hidden mdDown>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Hidden>
                </Box>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", marginTop: "24px" }}>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ textAlign: "center", marginBottom: "24px" }}
              >
                Ultimas Inspecciones Realizadas
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {LAST_INSPECTIONS.map((inspection, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        padding: "16px",
                        boxShadow: 3,
                        animation: `${fadeIn} 1s ease-in-out`,
                        backgroundColor: "#ffffff",
                        borderLeft: `4px solid #1976d2`,
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
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
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

const ACTIONS = [
  {
    icon: <AccountBalance />,
    color: "primary.main",
    title: "Finanzas",
    description: "Resumen de tus finanzas y transacciones recientes.",
  },
  {
    icon: <Assessment />,
    color: "secondary.main",
    title: "Reportes",
    description: "Accede a reportes detallados y análisis de datos.",
  },
  {
    icon: <Security />,
    color: "error.main",
    title: "Seguridad",
    description: "Verifica el estado de seguridad de tus pólizas.",
  },
  {
    icon: <Settings />,
    color: "info.main",
    title: "Configuración",
    description: "Administra las configuraciones de tu cuenta y preferencias.",
  },
];
