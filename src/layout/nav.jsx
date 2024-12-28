import { Box, Typography, List } from "@mui/material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import navConfig from "./config-navigation.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
	color: theme.palette.common.black,
	"&:hover": {
		backgroundColor: theme.palette.grey[300],
	},
	"&.Mui-selected": {
		backgroundColor: theme.palette.primary.lighter,
		color: theme.palette.primary.dark,
		borderLeft: `4px solid ${theme.palette.primary.main}`, 
		boxShadow: `inset 4px 0 0 ${theme.palette.primary.main}`,
	},
}));

const StyledBox = styled(Box)(({ theme }) => ({
	color: theme.palette.common.black,
	"&:hover": {
		backgroundColor: theme.palette.grey[300],
		borderRadius: "8px",
		cursor: "pointer",
	},
}));

const NavItem = ({ item, onClick, selected }) => {
	const { icon, title, path } = item;

	return (
		<StyledListItemButton
			selected={selected}
			onClick={() => onClick(path)}
			sx={{
				"&:hover": {
					backgroundColor: "grey.300",
				},
			}}
		>
			<ListItemIcon sx={{ color: "common.black" }}>{icon}</ListItemIcon>
			<ListItemText primary={title} sx={{ color: "common.black" }} />
		</StyledListItemButton>
	);
};

const Nav = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleItemClick = (path) => {
		navigate(path);
	};

	const renderAccount = (
		<StyledBox
			sx={{
				my: 3,
				mx: 2.5,
				py: 2,
				px: 1.5,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				backgroundColor: "grey.300",
				borderRadius: "8px",
			}}
		>
			<Typography variant="h5" fontWeight={600}>
				GESIAR
			</Typography>
		</StyledBox>
	);

	const renderMenu = (
		<List component="nav">
			{navConfig.map((item) => (
				<NavItem
					key={item.title}
					item={item}
					onClick={handleItemClick}
					selected={location.pathname.includes(item.path)}
				/>
			))}
		</List>
	);

	return (
		<Box
			sx={{
				width: 300,
				backgroundColor: "grey.200",
				height: "100vh",
				position: "sticky",
				top: 0,
				borderRight: "2px solid #e0e0e0",
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
