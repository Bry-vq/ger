import {
	Box,
	CircularProgress,
	IconButton,
	Menu,
	MenuItem,
	Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { IconDotsVertical, IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const mockInsurers = [
	{
		id: 1,
		insure: "Aseguradora 1",
		insured: "Asegurado 1",
		range: "Rango 1",
		assignationDate: "2021-10-10",
		inspectionDate: "2021-10-10",
	},
	{
		id: 2,
		insure: "Aseguradora 2",
		insured: "Asegurado 2",
		range: "Rango 2",
		assignationDate: "2021-10-10",
		inspectionDate: "2021-10-10",
	},
];

export const InspectionTable = ({ data = [], isLoading }) => {
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
		{ field: "id", headerName: "Id", flex: 1 },
		{ field: "insure", headerName: "Aseguradora", flex: 1 },
		{ field: "insured", headerName: "Asegurado", flex: 1 },
		{ field: "range", headerName: "Rango", flex: 1 },
		{ field: "assignationDate", headerName: "Fecha Asignación", flex: 1 },
		{ field: "inspectionDate", headerName: "Fecha Inspección", flex: 1 },
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
									`/aseguradoras/${params.row.Aseguradora_ID}/sucursal/${params.row.Sucursal_ID}`,
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
					rows={data}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
				/>
			)}
		</Paper>
	);
};
