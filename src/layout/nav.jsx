import { Box, Avatar, Typography, List } from "@mui/material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import navConfig from "./config-navigation.jsx";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

// Estilo personalizado para los botones de navegación
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
	color: theme.palette.common.white,
	"&:hover": {
		backgroundColor: "rgba(255, 255, 255, 0.08)",
	},
}));

const NavItem = ({ item, onClick }) => {
	const { icon, title, path } = item;

	return (
		<StyledListItemButton onClick={() => onClick(path)}>
			<ListItemIcon sx={{ color: "common.white" }}>{icon}</ListItemIcon>
			<ListItemText primary={title} sx={{ color: "common.white" }} />
		</StyledListItemButton>
	);
};

const Nav = () => {
	const navigate = useNavigate();

	const handleItemClick = (path) => {
		navigate(path);
	};

	const renderAccount = (
		<Box
			sx={{
				my: 3,
				mx: 2.5,
				py: 2,
				px: 2.5,
				display: "flex",
			}}
		>
			<Box sx={{ ml: 2 }}>
				<Typography variant="h5" sx={{ color: "common.white" }}>
					GESIAR
				</Typography>
			</Box>
		</Box>
	);

	const renderMenu = (
		<List component="nav">
			{navConfig.map((item) => (
				<NavItem key={item.title} item={item} onClick={handleItemClick} />
			))}
		</List>
	);

	return (
		<Box
			sx={{
				width: 250,
				backgroundColor: "primary.main",
				height: "100vh",
				position: "sticky",
				top: 0,
				borderRadius: "0 8px 8px 0",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{renderAccount}
			{renderMenu}
		</Box>
	);
};

export default Nav;
