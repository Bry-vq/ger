import {
	Box,
	CircularProgress,
	IconButton,
	Menu,
	MenuItem,
	Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconTrash, IconDotsVertical, IconEdit } from "@tabler/icons-react";
import theme from "../../../theme/theme.js";

export const EmployeesTable = ({
	employees,
	isLoading,
	onEdit,
	anchorEl,
	isOptionsMenuOpen,
	selectedRowId,
	onCloseMenu,
	setAnchorEl,
	setSelectedRowId,
}) => {
	const handleMenuOptionClick = (event, rowId) => {
		setAnchorEl(event.currentTarget);
		setSelectedRowId(rowId);
	};

	const columns = [
		{ field: "document", headerName: "Documento", flex: 1 },
		{ field: "username", headerName: "Nombre", flex: 1 },
		{ field: "phone", headerName: "Teléfono", flex: 1 },
		{
			field: "actions",
			headerName: "",
			renderCell: (params) => (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="100%"
				>
					<IconButton
						onClick={(event) => handleMenuOptionClick(event, params.row.id)}
					>
						<IconDotsVertical />
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={isOptionsMenuOpen && selectedRowId === params.row.id}
						onClose={onCloseMenu}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<MenuItem
							onClick={() => {
								onEdit(params.row);
								onCloseMenu();
							}}
						>
							<IconEdit size={24} />
						</MenuItem>
						<MenuItem
							onClick={() => {
								console.log("Eliminar");
							}}
							sx={{ color: theme.palette.error.main }}
						>
							<IconTrash size={24} />
						</MenuItem>
					</Menu>
				</Box>
			),
		},
	];
	return (
		<Paper elevation={1} sx={{ height: "500px" }}>
			{isLoading ? (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="100%"
				>
					<CircularProgress />
				</Box>
			) : (
				<DataGrid
					columns={columns}
					rows={employees}
					getRowId={(row) => row.id}
				/>
			)}
		</Paper>
	);
};
