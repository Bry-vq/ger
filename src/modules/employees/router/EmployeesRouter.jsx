import { EmployeesPage } from "../page/EmployeesPage.jsx";

export const EmployeesRouterStack = {
	path: "empleados",
	children: [
		{
			index: true,
			element: <EmployeesPage />,
		},
	],
};
