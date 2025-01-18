import { Box, CircularProgress, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const EmployeesTable = ({ employees, isLoading }) => {
	const columns = [
		{ field: "document", headerName: "Documento", flex: 1 },
		{ field: "username", headerName: "Nombre", flex: 1 },
		{ field: "phone", headerName: "Teléfono", flex: 1 },
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
