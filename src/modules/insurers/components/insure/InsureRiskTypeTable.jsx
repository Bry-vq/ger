import { Box, IconButton, Menu, MenuItem, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconTrash, IconDotsVertical, IconEdit } from "@tabler/icons-react";
import theme from "../../../../theme/theme.js";

export const InsureRiskTypeTable = ({
	rows,
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
		{ field: "name", headerName: "Tipo de Riesgo", flex: 2 },
		{ field: "description", headerName: "Descripción", flex: 3 },
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
		<Paper elevation={1}>
			<DataGrid columns={columns} rows={rows} />
		</Paper>
	);
};
