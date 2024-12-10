import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/index.jsx";
import { AuthRouterStack } from "../modules/auth/router/authRouter.jsx";
import { HomeRouterStack } from "../modules/home/router/HomeRouter.jsx";
import { InsureRouterStack } from "../modules/insurers/router/insureRouter.jsx";
import { InspectionRouterStack } from "../modules/inspection/router/inspectionRouter.jsx";
import { useAuth } from "../modules/auth/login/hooks/useAuth.jsx";

export function PrivateRoute({ children }) {
	const { authState } = useAuth();

	if (!authState) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
}

export const PublicRoute = ({ children }) => {
	const { authState } = useAuth();

	return !authState ? <>{children}</> : <Navigate to="/home" replace />;
};

export const router = createBrowserRouter([
	// Public Routes
	{
		...AuthRouterStack,
		element: <PublicRoute>{AuthRouterStack.element}</PublicRoute>,
	},

	// Private Routes (Protected by PrivateRoute)
	{
		path: "/",
		element: (
			<PrivateRoute>
				<MainLayout />
			</PrivateRoute>
		),
		children: [
			HomeRouterStack,
			InsureRouterStack,
			InspectionRouterStack,
			{ path: "*", element: <Navigate to="/home" replace /> }, // Fallback route
		],
	},
]);
