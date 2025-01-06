import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { IconDotsVertical, IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

export const InsuredTable = ({ data, isLoading }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
	const navigate = useNavigate();

	const handleMenuOptionClick = (event, rowId) => {
		setAnchorEl(event.currentTarget);
		setSelectedRowId(rowId);
		setIsOptionsMenuOpen(true);
	};

	const handleMenuOptionClose = () => {
		setAnchorEl(null);
		setIsOptionsMenuOpen(false);
	};

	const columns = [
		{ field: "id", headerName: "ID", flex: 1 },
		{ field: "document", headerName: "Documento", flex: 1 },
		{ field: "name", headerName: "Razón Social", flex: 1 },
		{
			field: "actions",
			headerName: "",
			renderCell: (params) => (
				<Box display="flex" justifyContent="center">
					<IconButton
						onClick={(event) => handleMenuOptionClick(event, params.row.id)}
					>
						<IconDotsVertical />
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={isOptionsMenuOpen && selectedRowId === params.row.id}
						onClose={handleMenuOptionClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<MenuItem
							onClick={() => {
								navigate(`/asegurado/${params.row.id}`);
								handleMenuOptionClose();
							}}
						>
							<IconEye size={24} />
							Ver
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
					rows={data}
					getRowId={(row) => row.id}
					loading={isLoading}
					disableSelectionOnClick
				/>
			)}
		</Paper>
	);
};
