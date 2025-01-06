import { Box, IconButton, Menu, MenuItem, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { IconDotsVertical, IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const EmployeesTable = ({ employees }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedRowId, setSelectedRowId] = useState(null); // Para almacenar la fila seleccionada
	const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
	const navigate = useNavigate();

	const handleMenuOptionClick = (event, rowId) => {
		setAnchorEl(event.currentTarget);
		setSelectedRowId(rowId); // Establece la fila seleccionada
		setIsOptionsMenuOpen(true);
	};

	const handleMenuOptionClose = () => {
		setAnchorEl(null);
		setIsOptionsMenuOpen(false);
	};

	const columns = [
		{ field: "document", headerName: "Id", flex: 1 },
		{ field: "username", headerName: "Nombre", flex: 1 },
		{ field: "phone", headerName: "Teléfono", flex: 1 },
		{
			field: "actions",
			headerName: "",
			renderCell: (params) => (
				<Box display="flex" justifyContent="center">
					<IconButton
						onClick={(event) =>
							handleMenuOptionClick(event, params.row.Sucursal_ID)
						}
					>
						<IconDotsVertical />
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={isOptionsMenuOpen && selectedRowId === params.row.Sucursal_ID} // Abre el menú solo para la fila correcta
						onClose={handleMenuOptionClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<MenuItem
							onClick={() => {
								console.log(params.row); // Navega a la página de detalles de la aseguradora
								navigate(
									`/empleados/${params.row.Aseguradora_ID}/sucursal/${params.row.Sucursal_ID}`,
								);
								handleMenuOptionClose(); // Cierra el menú después de hacer clic
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
		<Paper elevation={1}>
			<DataGrid columns={columns} rows={employees} getRowId={(row) => row.id} />
		</Paper>
	);
};
