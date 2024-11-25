import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "./nav.jsx";

const MainLayout = () => {
	return (
		<Box
			sx={{
				display: "flex",
				minHeight: "100%",
				backgroundColor: "grey.100",
			}}
		>
			<Nav />

			<Outlet />
		</Box>
	);
};

export default MainLayout;
